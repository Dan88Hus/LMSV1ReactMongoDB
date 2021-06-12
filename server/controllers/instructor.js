const User = require('../models/user')
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const queryString = require("query-string")
const Course = require("../models/course")




exports.makeInstructor = async(req, res)=>{
    try {
        console.log("============>we are in")
        const user = await User.findById(req.user._id).exec()
        if(!user.stripe_account_id){
            const account = await stripe.accounts.create({type: "express"})
            // console.log(account.id)
            
            user.stripe_account_id = account.id 
            user.save()
        }
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: "account_onboarding",
        })
        // console.log("here we are")
        // console.log("accountLink====", accountLink)
        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email,
        })
        //query-string arranges key: value as url address
        return res.json(`${accountLink.url}?${queryString.stringify(accountLink)}`)
    } catch (error) {
        // console.log(error)
    }   return res.status(400).send("make instructor , stripe error")
}

exports.getAccountStatus = async(req,res) =>{
    try {
        const user = await User.findById(req.user._id).exec()
        const account = await stripe.accounts.retrieve(user.stripe_account_id)
        if(!account.charges_enabled){
            return res.status(401).send("charge is unavailable, unauthorized")
        } else {
            const statusUpdated = await User.findByIdAndUpdate(user._id, {
                stripe_seller: account,
                $addToSet: {role: "Instructor"}
                // $addToSet te duplicate data olmayacak , eger duplicate varsa push veya set method kullanilabilinir
            }, {new:true}).select("-password").exec()
            // console.log("StatusUpdated......",statusUpdated)
            return res.json(statusUpdated)
        }
    } catch (error) {
        console.log(error.message)
    }
}

exports.currentInstructor = async(req,res)=>{
    try {
        let user = await User.findById(req.user._id).select("-password").exec()
    if(!user.role.includes("Instructor")){
        return res.sendstatus(403)
    } else{
        res.json({ok:true})
    } 
    
    } catch (error) {
        console.log(error.message)
    }
    
}

exports.instructorCourses = async (req,res)=>{
    try {
        const courses = await Course.find({instructor: req.user._id}).sort({createdAt: -1}).exec()
        // console.log(courses)
        res.json(courses)
    } catch (error) {
        console.log(error.message)
    }
}

