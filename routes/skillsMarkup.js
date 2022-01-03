import express from 'express'
import SkillsMarkup from '../models/skillsMarkup.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const skillsMarkup = await SkillsMarkup.find({})
    res.send({
        success: true,
        data: skillsMarkup,
        message: "Skills have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { skills_name, skills_level } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new SkillsMarkup({
            skills_name: skills_name,
            skills_level: skills_level
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Skill has been added successfully"
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
        SkillsMarkup.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Skill has been deleted successfully"
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