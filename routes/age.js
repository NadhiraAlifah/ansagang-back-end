import express from 'express'
import Age from '../models/age.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const age = await Age.find({})
    res.send(age)
})

router.post('/change/apikey=:apikey', async (req, res) => {
    const { age, date, _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        Age.findByIdAndUpdate(_id, { age: age, date: date }).then(err => {
            if (!err) {
                res.json({ success: true })
            } else {
                res.json({ success: false, error: err })
            }
        })
    }
})

export default router