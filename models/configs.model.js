import mongoose from 'mongoose'

const configsSchema = mongoose.Schema({
    api_key: String,
    api_password:String
})

const Configs = mongoose.model('configs', configsSchema)

export default Configs