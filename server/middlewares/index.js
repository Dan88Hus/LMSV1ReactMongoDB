const User = require("../models/user")
const expressJwt = require("express-jwt")
const Course = require("../models/course")

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

exports. isEnrolled = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id).exec()
        const course = await Course.findOne({slug: req.params.slug}).exec()
        let ids = []
        for (let i=0; i<user.courses.length; i++){
            ids.push(user.courses[i].toString())
        }
        if (!ids.includes(course._id.toString())){
            res.sendStatus(403)

        }else{
            next()
        }

    } catch (error) {
        console.log(error.message)
    }
}