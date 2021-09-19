import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
    username: {type: String, required: true},
    subject: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
})

const Form = mongoose.model("Form", formSchema)

export default Form;