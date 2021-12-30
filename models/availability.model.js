import mongoose from 'mongoose'

const availabilitySchema = mongoose.Schema({
  availability: String
})

const Availability = mongoose.model('availability', availabilitySchema)

export default Availability