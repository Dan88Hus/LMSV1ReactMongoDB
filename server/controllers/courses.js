const AWS = require('aws-sdk') 
const {nanoid} = require("nanoid")
const Course = require("../models/course")
const slugify = require("slugify")
const fs = require("fs")


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
            console.log(error.message)
        }

}