import express from 'express'
import QuestionsAnswers from '../models/questionsanswers.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const questionsAnswers = await QuestionsAnswers.find({})
    res.send(questionsAnswers)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { question, answer } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new QuestionsAnswers({ question: question, answer: answer }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        QuestionsAnswers.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router