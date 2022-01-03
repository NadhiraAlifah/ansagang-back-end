import express from 'express'
import PortfolioProjectsTabs from '../models/portfolioProjectsTabs.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const portfolioProjectsTabs = await PortfolioProjectsTabs.find({})
    res.send({
        success: true,
        data: portfolioProjectsTabs,
        message: "Portfolio Projects Tabs have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { id, title } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new PortfolioProjectsTabs({
            id: id,
            title: title
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Portfolio Project Tab has been added successfully"
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
        PortfolioProjectsTabs.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Portfolio Project Tab has been deleted successfully"
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