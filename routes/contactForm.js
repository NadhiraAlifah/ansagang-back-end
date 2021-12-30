import express from 'express'
import ContactMe from '../models/contactForm.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const contactForm = await ContactMe.find({})
    res.send(contactForm)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { username, subject, email , message } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new ContactMe({ username: username, subject: subject, email: email, message: message }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        ContactMe.deleteMany().then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router