import mongoose from 'mongoose'

const passwordSchema = mongoose.Schema({
    password:String
})

const Password = mongoose.model('password', passwordSchema)

export default Password