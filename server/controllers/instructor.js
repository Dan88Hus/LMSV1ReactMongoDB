const User = require('../models/user')
const stripe = require("stripe")
const queryString = require("query-string")



exports.makeInstructor = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).exec()
        if(!user.stripe_account_id){
            const account = await stripe.accounts.create({type: "express"})
            user.stripe_account_id = account._id 
            user.save()
        }
        const accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: "account_onboarding",
        })
        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email,
        })
        //query-string arrages key: value as url address
        return res.json(`${accountLink.url}?${queryString.stringify(accountLink)}`)
    } catch (error) {
        console.log(error)
    }   return res.status(400).send("make instructor , stripe error")
}
