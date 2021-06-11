const User = require('../models/user')


exports.makeInstructor = async(req, res)=>{
    try {
        const {email, code, newPassword} = req.body
        // console.table( req.body)
        const hashedPassword = await hashPassword(newPassword)
        const user = User.findOneAndUpdate({
            email, passwordResetCode: code
        }, {password: hashedPassword, passwordResetCode: ""}).exec()
        return res.json({ok: true})
    } catch (error) {
        console.log(error)
    }   return res.status(400).send("reset password error")
}
