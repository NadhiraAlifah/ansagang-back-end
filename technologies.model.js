const mongoose = require('mongoose')

const technologiesSchema = new mongoose.Schema({
    id:String,
    title:String
})

module.exports = mongoose.model('technologies', technologiesSchema)