const AWS = require('aws-sdk') 
const {nanoid} = require("nanoid")
const Course = require("../models/course")
const User = require("../models/user")
const slugify = require("slugify")
const fs = require("fs")
const stripe = require("stripe")(process.env.STRIPE_SECRET)


const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION, 
}

const S3 = new AWS.S3(awsConfig)

exports.uploadImage = async(req, res)=>{
    // console.log(req.body.image)
    try {
        const {image} = req.body
        if(!image) {
            return res.status(400).send("No Image")
        }
        // image comes as data:imageKJNEDFKDSAFDSF..... and we extrac data:image part
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),"base64")
        const type = image.split(";")[0].split("/")[1] //jpeg 
        const params = {
            Bucket: "huseyindevbucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,

        }
        S3.upload(params, (err, data) =>{
            if(err){
                console.log(err)
                return res.sendStatus(400)
            }
            // console.log(data)
            res.send(data)
        })
    } catch (error) {
        console.log(error)
    }
}
exports.removeImage = async(req, res)=>{
    try {
       const {image} = req.body 
       const params = {
           Bucket: image.Bucket,
           Key: image.Key,
       }
       S3.deleteObject(params, (error, data) =>{
           if(error){
               console.log("Image Delete Error", error)
               res.sendStatus(400)
           }
           res.send({ok: true})
       })
    } catch (error) {
        console.log(error)
    }
}

exports.create = async(req,res) =>{
    // console.log("create course")
    // console.log(req.body)
    // return
    try {
        const alreadyExist = await Course.findOne({slug: slugify(req.body.name.toLowerCase())})
        if(alreadyExist){
            return res.status(400).send("Title is taken")
        }
        const course = await new Course({
            slug: slugify(req.body.name),
            instructor: req.user._id,
            ...req.body,
        }).save()
        res.json(course)
    } catch (error) {
        console.log("Course create server Error")
        return res.status(400).send("Course create failed")
    }
}

exports.read = async(req,res) =>{
    // console.log("read end-point")
    try {
        const course = await Course.findOne({slug: req.params.slug}).populate("instructor","_id name").exec()
        res.json(course)
    } catch (error) {
        console.log(error.message)

    }
}

exports.uploadVideo = async(req, res)=> {
    try {
        // console.log("req.user._id:",req.user._id )
        // console.log("req.params.instructorId:",req.params.instructorId )
        if(req.user._id != req.params.instructorId){
            return res.status(400).send("unauthorized to modify")
        }
        const {video} = req.files
        // req.files formidable middleware deen dolayi geliyor

        const params = {
            Bucket: "huseyindevbucket",
            Key: `${nanoid()}.${video.type.split("/")[1]}`, 
            //mp4 we split video from video-mp4     
            // Body: base64Data,
            Body: fs.readFileSync(video.path),
            ACL: "public-read",
            // ContentEncoding: "base64",
            ContentType: video.type,
        }
        // console.log("========",video)
        if(!video){
            return res.status(400).send("No video")
        }
            //upload to s3
        S3.upload(params, (err, data) =>{
            if(err){
                console.log(err)
                return res.sendStatus(400)
            }
            // console.log(data)
            res.send(data)
        })
        } catch (error) {
            console.log(error.message)
        }

}
exports.removeVideo = async(req, res) =>{

    try {
        if(req.user._id != req.params.instructorId){
            return res.status(400).send("unauthorized to modify")
        }
        const {video} = req.body
        // console.log("-----body---",req.body)
        // console.log("=====video====", video)
        
        const params = {
            Bucket: video.Bucket,
            Key: video.Key, 
        }
            //delete to s3
        S3.deleteObject(params, (err, data) =>{
            if(err){
                console.log(err)
                return res.sendStatus(400)
            }
            // console.log(data)
            res.send({ok: true})
        })
        } catch (error) {
            console.log("remove video",error.message)
        }

}
exports.addLesson = async(req, res) =>{
    try {
        const {slug, instructorId} = req.params 
        const {title, content, video} = req.body
        if(req.user._id != instructorId){
            return res.status(400).send("unauthorized to modify")
        }
        const updated = await Course.findOneAndUpdate({slug}, {$push: {lessons: {title, content, video, slug: slugify(title)}}}, {new:true}).populate("instructor", "_id name").exec()
        res.json(updated)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("Add lesson is failed")
    }
}
exports.update = async(req,res) =>{
    // console.log("create course")
    // console.log(req.body)
    // return
    const {slug} = req.params
    // console.log(slug)
    try {
        const course = await Course.findOne({
            slug
        }).exec()
        // console.log(course)
        if(req.user._id != course.instructor){
            return res.status(400).send("unauthorized to modify")
        }   
        const updated = await Course.findOneAndUpdate({slug}, req.body, {new:true}).exec()

        res.json(updated)
    } catch (error) {
        console.log("Course update server Error")
        return res.status(400).send("Course update failed")
    }
}
exports.removeLesson = async(req, res) =>{
    try {
        const {slug, lessonId} = req.params
        const course = await Course.findOne({slug}).exec()
        if(req.user._id != course.instructor){
            return res.status(400).send("unauthorized to modify")
        }  
        const courseDelete = await Course.findByIdAndUpdate(course._id, {$pull: {lessons: {_id: lessonId}}}).exec()
        res.json({ok: true})
    } catch (error) {
        console.log("RemoveLesson is failed for server",error.message)
    }
}
exports.updateLesson = async(req, res) =>{
    // console.log("update lesson")
    const {slug} = req.params
    const course = await Course.findOne({slug}).select("instructor").exec()
    if(req.user._id != course.instructor._id){
        return res.status(400).send("unauthorized to modify")
    }
    const {title, content, video, free_preview, _id} = req.body 
    const updated = await Course.updateOne({"lessons._id": _id}, {
        $set: { "lessons.$.title": title,
            "lessons.$.content": content,
            "lessons.$.video": video,
            "lessons.$.free_preview": free_preview,}
    }, {new: true}).exec()
    // console.log(updated)
    res.json({ok: true})
}
exports.publishCourse = async(req,res) =>{
    //
    try {
        const {courseId} = req.params 
        const course = await Course.findById(courseId).select("instructor").exec()
        if(req.user._id != course.instructor._id){
            return res.status(400).send("unauthorized to modify")
        }
        const updated = await Course.findByIdAndUpdate(courseId, {published : true}, {new:true}).exec()
        res.json(updated)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("publish course server error")
    }
}
exports.unpublishCourse = async(req,res)=>{
    //
    try {
        const {courseId} = req.params 
        const course = await Course.findById(courseId).select("instructor").exec()
        if(req.user._id != course.instructor._id){
            return res.status(400).send("unauthorized to modify")
        }
        const updated = await Course.findByIdAndUpdate(courseId, {published : false}, {new:true}).exec()
        res.json(updated)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("unpublish course server error")
    }
}
exports.courses = async(req,res) =>{
    try {
        const all = await Course.find({published: true}).populate("instructor", "_id name").exec()
        res.json(all)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("find published courses server error")
    }
}

exports.checkEnrollment = async (req,res) =>{
    const {courseId} = req.params
    console.log(courseId)
    const user = await User.findById(req.user._id).exec()
    let ids =[]
    let length = user.courses && user.courses.length
    if(length){
        for (let i =0; i< length; i++){
            ids.push(user.courses[i].toString())
        }
    }

    res.json({ 
        status: ids.includes(courseId), //true or false
        course: await Course.findById(courseId).exec() //Dont know why we need this
    })
}
exports.freeEnrollment = async (req,res) => {
    try { 
        const course = await Course.findById(req.params.courseId).exec()
        if(course.paid) return
        const result = await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { courses: course._id}
        }, {new:true}).exec()
        //addtoset method prevent duplicates in array instead of set method
        res.json({
            message: "Congratulations to enrollment",
            course: course
        })
    } catch (error) {
        console.log("Free enrollment error",error.message)
        res.status(404).send("Enrollment create failed")
    }
}
exports.paidEnrollment = async (req,res)=> {
    try { 
        const course = await Course.findById(req.params.courseId).populate("instructor").exec()
        if(!course.paid) return
        //application fee%
        const fee = (course.price * 30)/100
        //stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                name: course.name,
                amount: Math.round(course.price.toFixed(2)*100), // in cents
                currency: "usd",
                quantity: 1,

            }],
            //charge buyer and transfer balance to seleer after fee
            payment_intent_data:{
                application_fee_amount: Math.round(fee.toFixed(2)*100),
                transfer_data: {
                    destination: course.instructor.stripe_account_id,
                }
            },
            // redirect url after successful payment 
            success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })
        // console.log("session Id", session)
        // save session to DB in user field by updating
        const result = await User.findByIdAndUpdate(req.user._id, {
            stripeSession: session
        }, {new:true}).exec()
        res.send(session.id)
    } catch (error) {
        console.log("Paid enrollment error",error.message)
        res.status(404).send("Paid Enrollment create failed")
    }
}