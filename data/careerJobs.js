const careerJobsModel = require('../careerJobs.model.js')

module.exports = async() => {
    return await careerJobsModel.find({})
}
