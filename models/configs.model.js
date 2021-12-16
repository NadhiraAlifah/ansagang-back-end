const mongoose = require('mongoose')

const configsSchema = new mongoose.Schema({
    api_password:String
})

module.exports = mongoose.model('configs', configsSchema)