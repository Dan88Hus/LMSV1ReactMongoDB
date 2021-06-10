const User = require('../models/user')
const {hashPassword, comparePassword} = require('../utils/auth')
const jwt = require("jsonwebtoken")

exports.register = async (req,res) => {
    try {
        // console.log(req.body)
        const {name, email, password} = req.body
        if (!name || !password || password.length < 6 ) return res.status(400).send('Name and password is required and min pass for 6 char')
        let userExist = await User.findOne({email}).exec()
        if (userExist) return res.status(400).send("Email is taken")

        const hashedPassword = await hashPassword(password)
        // console.log("hashed Password", hashedPassword)
        const user = new User({
            name, email, password: hashedPassword
        })
        await user.save()
        // console.log("saved user", user)
        return res.json({ok: true})

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error try register again")
    }
}

exports.login = async (req,res) => {
    try {
    //    console.log(req.body) 
    const {email, password} = req.body
    const user = await User.findOne({email}).exec()
    if (!user) return res.status(400).send("No user Found")
    const match = await comparePassword(password, user.password)
    //create JWT
    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
    // to send cookie with the named cookie
    res.cookie("token", token, {httpOnly: true, 
        // secure: true //works for https
    })
    // send user as json.response
    user.password = undefined
    res.json(user)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("Error Try Login again")
    }
}

exports.logout = async(req, res) => {
    try {
        //clear cookie
        res.clearCookie("token");
        return res.json({message: "Signout success"})
    } catch (error) {
        console.log(error)
    }
}

exports.currentUser = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").exec()
        console.log("Current User", user)
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}