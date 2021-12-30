import mongoose from 'mongoose'

const careerSchema = mongoose.Schema({
  career_job_title: String
})

const CareerJobs = mongoose.model('careerjobs', careerSchema)

export default CareerJobs