const mongoose = require('mongoose')

const skillsMarkupSchema = new mongoose.Schema({
    skills_name:String,
    skills_level:String
})

module.exports = mongoose.model('skills_markup', skillsMarkupSchema)