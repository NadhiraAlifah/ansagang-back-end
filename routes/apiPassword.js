import express from 'express'
import Configs from '../models/configs.model.js'

const router = express.Router()

router.post('/check', async (req, res) => {
  const { api_password } = req.body
  const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
  if (api_password === configs.api_password) {
    res.send({
      success: true,
      message: "Password is correct"
    })
  } else {
    res.send({
      success: false,
      message: "Password is incorrect"
    })
  }
})

export default router