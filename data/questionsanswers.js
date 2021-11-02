const questionsanswersModel = require('../questionsanswers.model.js')

module.exports = async() => {
    return await questionsanswersModel.find({})
}