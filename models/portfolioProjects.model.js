import mongoose from 'mongoose'

const portfolioProjectsSchema = mongoose.Schema({
    project_title: String,
    project_overview: String,
    project_poster: Array,
    project_lang: Array,
    project_logo: String,
    project_theme: String,
    project_theme_id: String,
    project_link: String,
    project_favourite:Boolean,
    project_year:String,
})

const PortfolioProjects = mongoose.model('portfolio_projects', portfolioProjectsSchema)

export default PortfolioProjects