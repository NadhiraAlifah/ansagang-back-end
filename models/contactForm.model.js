import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
  username: String,
  subject: String,
  email: String,
  message: String
})

const ContactMe = mongoose.model('contact_me', contactSchema)

export default ContactMe