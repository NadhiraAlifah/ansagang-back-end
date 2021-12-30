import mongoose from 'mongoose'

const technologiesSchema = mongoose.Schema({
    id:String,
    title:String
})

const Technologies = mongoose.model('technologies', technologiesSchema)

export default Technologies