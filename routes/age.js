import express from 'express'
import Age from '../models/age.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const age = await Age.findOne({ _id: "6190f73ba45f8953457d84b9" })
    res.send({
        success: true,
        data: age,
        message: "Age has been retrieved successfully"
    })
})

router.post('/change/apikey=:apikey', async (req, res) => {
    const { age, date, _id } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        Age.findByIdAndUpdate(_id, { age: age, date: date }).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Age has been updated successfully"
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