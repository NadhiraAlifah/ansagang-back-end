import express from 'express'
import CareerJobs from '../models/careerJobs.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const careerJobs = await CareerJobs.find({})
    res.send({
        success: true,
        data: careerJobs,
        message: "Career Jobs have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { career_job_title } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new CareerJobs({ career_job_title: career_job_title }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Career Job has been added successfully"
                })
            }
            else {
                res.send({
                    success: false,
                    message: err
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "Invalid api key"
        })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        CareerJobs.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Career Job has been deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: err
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "Invalid api key"
        })
    }
})

export default router