import mongoose from 'mongoose'

const technologiesItemsSchema = mongoose.Schema({
    id:String,
    title:String,
    img:String
})

const TechnologiesItems = mongoose.model('technologies_items', technologiesItemsSchema)

export default TechnologiesItems