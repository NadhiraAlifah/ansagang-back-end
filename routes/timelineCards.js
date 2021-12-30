import express from 'express'
import TimelineCards from '../models/timelineCards.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const timelineCards = await TimelineCards.find({})
    res.send(timelineCards)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { timelinecard_year, timelinecard_action } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new TimelineCards({ timelinecard_year: timelinecard_year, timelinecard_action: timelinecard_action }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        TimelineCards.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router