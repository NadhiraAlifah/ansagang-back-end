import express from 'express'
import PortfolioProjectsTabs from '../models/portfolioProjectsTabs.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const portfolioProjectsTabs = await PortfolioProjectsTabs.find({})
    res.send(portfolioProjectsTabs)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { id, title } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new PortfolioProjectsTabs({ id: id, title: title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        PortfolioProjectsTabs.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router