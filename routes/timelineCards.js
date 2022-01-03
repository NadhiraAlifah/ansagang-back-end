import express from 'express'
import TimelineCards from '../models/timelineCards.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const timelineCards = await TimelineCards.find({})
    res.send({
        success: true,
        data: timelineCards,
        message: "Timeline Cards have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { timelinecard_year, timelinecard_action } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new TimelineCards({
            timelinecard_year: timelinecard_year,
            timelinecard_action: timelinecard_action
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Timeline Card has been added successfully"
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

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        TimelineCards.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Timeline Card has been deleted successfully"
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