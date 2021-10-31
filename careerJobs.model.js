const mongoose = require('mongoose')

const careerSchema = new mongoose.Schema({
  career_job_title: String
})

module.exports = mongoose.model('careerJobs', careerSchema)