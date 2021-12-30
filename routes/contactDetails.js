import express from 'express'
import ContactDetails from '../models/contactDetails.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const contactDetails = await ContactDetails.find({})
    res.send(contactDetails)
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { contact_detail_title, contact_detail_value, contact_detail_link } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        new ContactDetails({ contact_detail_title: contact_detail_title, contact_detail_value: contact_detail_value, contact_detail_link: contact_detail_link }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        ContactDetails.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router