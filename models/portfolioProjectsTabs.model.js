import mongoose from 'mongoose'

const portfolioProjectsTabsSchema = mongoose.Schema({
  id:String,
  title: String
})

const PortfolioProjectsTabs = mongoose.model('portfolio_projects_tabs', portfolioProjectsTabsSchema)

export default PortfolioProjectsTabs