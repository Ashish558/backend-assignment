var express = require('express')
var mongoose = require('mongoose')

require("dotenv").config()

var app = express();

app.use(express.json())
app.use(express.static(__dirname + "/public"))

//mongodb connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err))

mongoose.connection.on("connected", () => {
    console.log("connected successfully !!!")
})

mongoose.connection.on("error", () => {
    console.log("error")
})

//user api
const userRoute = require('./routes/user')
app.use(userRoute)


const PORT = process.env.PORT || 4000

app.listen(PORT)
console.log('server on')
