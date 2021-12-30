import express from 'express'
import Availability from '../models/availability.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const availability = await Availability.find({})
    res.send(availability)
})

router.post('/change/apikey=:apikey', async (req, res) => {
    const { availability, _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        Availability.findByIdAndUpdate(_id, { availability: availability }).then(err => {
            if (!err) {
                res.json({ success: true })
            } else {
                res.json({ success: false, error: err })
            }
        })
    }
})

export default router