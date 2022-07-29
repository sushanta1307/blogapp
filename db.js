const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_URI

const connectToMongo = () =>{
    mongoose.connect(URI)
    .then(()=>{
        console.log(`connection successful`)
    })
    .catch((err)=>{
        console.log(`No connection: ${err}`)
    })
}

module.exports = connectToMongo;