const careerJobsModel = require('../careerJobs.model.js')
const contactMeModel = require('../contact.model.js')
const careerJobs = [
  {
    career_job_title: 'Front End Developer'
  },
  {
    career_job_title: 'Freelancer'
  },
  {
    career_job_title: 'Web Designer'
  }
]

module.exports = async() => {
    return await careerJobsModel.find({})
}
