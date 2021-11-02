const portfolioProjectsModel = require('../portfolioProjects.model.js')

module.exports = async() => {
    return await portfolioProjectsModel.find({})
}