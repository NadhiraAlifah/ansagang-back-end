const passwordModel = require('../password.model.js')

module.exports = async() => {
    return await passwordModel.find({})
}