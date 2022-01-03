import express from 'express'
import Availability from '../models/availability.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const availability = await Availability.findOne({_id: "6190ea9a3be9a81c7bb2c5a0"})
    res.send({
        success: true,
        data: availability,
        message: "Availavility has been retrieved successfully"
    })
})

router.post('/change/apikey=:apikey', async (req, res) => {
    const { availability, _id } = req.body
    const configs = await Configs.findOne({_id: "61bb0a67959494f1b8ba8375"})
    if (req.params.apikey === configs.api_key) {
        Availability.findByIdAndUpdate(_id, { availability: availability }).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Availability has been updated successfully"
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