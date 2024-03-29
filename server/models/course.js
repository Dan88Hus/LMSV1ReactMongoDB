const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 320,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    content: {
        type: {},
        minlength: 200,
    },
    video: {},
    free_preview: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 320,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: {},
        minlength: 200,
        required: true
    },
    price: {
        type: Number,
        // default: 9.99,
    },
    image: {},
    category: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: true,
    },
    instructor: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: ObjectId,
        ref: "User",
        required: true
    },
    lessons: [lessonSchema]

}, {timestamps:true})

module.exports = mongoose.model("Course", courseSchema)
