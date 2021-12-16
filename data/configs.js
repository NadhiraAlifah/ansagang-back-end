const configsModel = require('../models/configs.model.js')

module.exports = async() => {
    return await configsModel.find({})
}