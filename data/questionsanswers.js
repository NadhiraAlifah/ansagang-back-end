const questionsanswersModel = require('../models/questionsanswers.model.js')

module.exports = async() => {
    return await questionsanswersModel.find({})
}