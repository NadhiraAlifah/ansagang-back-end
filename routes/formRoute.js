import express from 'express'
const router = express.Router();
import Form from '../models/formModel'

router.route('/api/form').post((req, res) => {
    try {
        const username = req.body.username
        const subject = req.body.subject
        const email = req.body.email
        const message = req.body.message
        const newForm = new Form({
            username,
            subject,
            email,
            message
        })

        newForm.save()
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;