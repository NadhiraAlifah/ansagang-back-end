const portfolioProjectsTabsModel = require('../portfolioProjectsTabs.model.js')

module.exports = async() => {
    return await portfolioProjectsTabsModel.find({})
}