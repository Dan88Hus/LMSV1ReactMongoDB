const User = require("../models/user")
const expressJwt = require("express-jwt")

exports.requireSignin = expressJwt({
    getToken: (req,res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

exports.isInstructor = async(req, res , next) =>{
    // console.log("isInstructor middleware")
    try {
        const user = await User.findById(req.user._id).exec()
        // console.log(user)
        if(!user.role.includes("Instructor")){
            return res.sendStatus(403)
        } else {
            next()
        }
    } catch (error) {
        console.log("isInstructor middleware Error")
    }
}