import express from 'express'
import TechnologiesItems from '../models/technologiesItems.model.js'
import Configs from '../models/configs.model.js'
import multer from 'multer'
import e from 'express'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(new Error('This is not image file type'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

router.get('/get', async (req, res) => {
    const technologiesItems = await TechnologiesItems.find({})
    res.send({
        success: true,
        data: technologiesItems,
        message: "Technologies Items have been retrieved successfully"
    })
})

router.get('/random/get', async (req, res) => {
    const technologiesItems = await TechnologiesItems.find({})
    const technologiesItem = technologiesItems[Math.floor(Math.random() * technologiesItems.length)]
    res.send({
        success: true,
        data: technologiesItem,
        message: "Technologies Items have been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', upload.single('img'), async (req, res) => {
    const { id, title } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        new TechnologiesItems({
            id: id,
            title: title,
            img: req.file ? req.file.path : null
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Technologie Item has been deleted successfully"
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
        TechnologiesItems.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Technologie Item has been deleted successfully"
                })
            } else {
                res.send({
                    success: true,
                    message: err
                })
            }
        })
    } else {
        res.send({
            success: true,
            message: "Invalid api key"
        })
    }
})

export default router