const portfolioProjectsModel = require('../models/portfolioProjects.model.js')

module.exports = async() => {
    return await portfolioProjectsModel.find({})
}