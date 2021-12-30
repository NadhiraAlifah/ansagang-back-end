import express from 'express'
import Password from '../models/password.model.js'

const router = express.Router()

router.post('/check', async (req, res) => {
    const { password } = req.body
    const passwordOne = await Password.find({})
    if (password === passwordOne[passwordOne.length - 1].password) {
        res.send('Password is correct')
      } else {
        res.send('Password is incorrect')
      }
})

export default router