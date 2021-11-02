const technologiesModel = require('../technologies.model.js')

module.exports = async() => {
    return await technologiesModel.find({})
}