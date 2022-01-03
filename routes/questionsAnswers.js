import express from 'express'
import QuestionsAnswers from '../models/questionsanswers.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const questionsAnswers = await QuestionsAnswers.find({})
    res.send({
        success: true,
        data: questionsAnswers,
        message: "Questions Answers have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { question, answer } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new QuestionsAnswers({
            question: question,
            answer: answer
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Answer Question has been added successfully"
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
        QuestionsAnswers.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Answer Question has been deleted successfully"
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