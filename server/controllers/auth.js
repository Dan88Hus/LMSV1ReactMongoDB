const User = require('../models/user')
const {hashPassword, comparePassword} = require('../utils/auth')

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
        return res.status(400).send("Error try again")
    }
}