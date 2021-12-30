import mongoose from 'mongoose'

const skillsMarkupSchema = mongoose.Schema({
    skills_name:String,
    skills_level:String
})

const SkillsMarkup = mongoose.model('skills_markup', skillsMarkupSchema)

export default SkillsMarkup