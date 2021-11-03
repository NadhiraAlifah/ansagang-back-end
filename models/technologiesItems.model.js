const mongoose = require('mongoose')

const technologiesItemsSchema = new mongoose.Schema({
    id:String,
    title:String,
    img:String
})

module.exports = mongoose.model('technologies_items', technologiesItemsSchema)