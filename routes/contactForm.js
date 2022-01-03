import express from 'express'
import ContactMe from '../models/contactForm.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const contactForm = await ContactMe.find({})
    res.send({
        success: true,
        data: contactForm,
        message: "Contact Form has been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { username, subject, email, message } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new ContactMe({
            username: username,
            subject: subject,
            email: email,
            message: message
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Contact Detail has been added successfully"
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
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        ContactMe.deleteMany().then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Contact Form have been cleared successfully"
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