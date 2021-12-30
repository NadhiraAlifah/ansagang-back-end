import express from 'express'
import SkillsMarkup from '../models/skillsMarkup.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const skillsMarkup = await SkillsMarkup.find({})
    res.send(skillsMarkup)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { skills_name, skills_level } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new SkillsMarkup({ skills_name: skills_name, skills_level: skills_level }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        SkillsMarkup.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router