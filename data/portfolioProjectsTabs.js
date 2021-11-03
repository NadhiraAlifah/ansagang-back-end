const portfolioProjectsTabsModel = require('../models/portfolioProjectsTabs.model.js')

module.exports = async() => {
    return await portfolioProjectsTabsModel.find({})
}