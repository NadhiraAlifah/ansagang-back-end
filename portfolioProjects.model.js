const mongoose = require('mongoose')

const portfolioProjectsSchema = new mongoose.Schema({
    project_title: String,
    project_overview: String,
    project_poster: [{ src: String, title: String }],
    project_lang: [{ name: String }],
    project_logo: String,
    project_theme: String,
    project_theme_id: String,
    project_link: String,
    project_favourite:Boolean,
    project_id: String
})

module.exports = mongoose.model('portfolio_projects', portfolioProjectsSchema)