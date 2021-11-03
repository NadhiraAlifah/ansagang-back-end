const mongoose = require('mongoose')

const portfolioProjectsTabsSchema = new mongoose.Schema({
  id:String,
  title: String
})

module.exports = mongoose.model('portfolio_projects_tabs', portfolioProjectsTabsSchema)