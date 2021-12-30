import mongoose from 'mongoose'

const ageSchema = mongoose.Schema({
  age:String,
  date:Number
})

const Age = mongoose.model('age', ageSchema)

export default Age