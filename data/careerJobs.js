const careerJobsModel = require('../models/careerJobs.model.js')

module.exports = async() => {
    return await careerJobsModel.find({})
}
