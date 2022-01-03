import express from 'express'
import ContactDetails from '../models/contactDetails.model.js'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const contactDetails = await ContactDetails.find({})
    res.send({
        success: true,
        data: contactDetails,
        message: "Contact Details have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', async (req, res) => {
    const { contact_detail_title, contact_detail_value, contact_detail_link } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new ContactDetails({
            contact_detail_title: contact_detail_title,
            contact_detail_value: contact_detail_value,
            contact_detail_link: contact_detail_link
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
    const { _id } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        ContactDetails.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Contact Detail has been deleted successfully"
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