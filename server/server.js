const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const csrf = require("csurf")
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT= process.env.PORT || 8000

const csrfProtection = csrf({cookie: true})
//import routes
const fs = require("fs")

const app = express()

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}) //its promise
.then(() => console.log('DB connected'))
.catch((error) => console.log("DB Connection Error",error))

//middlewares

app.use(cors())
app.use(express.json({limit: "5mb"}))
app.use(cookieParser())  
app.use(morgan("dev"))

// routes middleware
fs.readdirSync("./routes").map((r)=> app.use("/api",require(`./routes/${r}`)))
// csrf 
app.use(csrfProtection)


app.get("/api/csrf-token", (req, res)=>{
  res.json({csrfToken: req.csrfToken()})
})

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`)
})