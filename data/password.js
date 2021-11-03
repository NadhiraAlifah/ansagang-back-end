const passwordModel = require('../models/password.model.js')

module.exports = async() => {
    return await passwordModel.find({})
}