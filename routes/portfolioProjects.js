import express from 'express'
import PortfolioProjects from '../models/portfolioProjects.model.js'
import Configs from '../models/configs.model.js'
import multer from 'multer'

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
    const portfolioProjects = await PortfolioProjects.find({})
    res.send({
        success: true,
        data: portfolioProjects,
        message: "Portfolio Projects have been retrieved successfully"
    })
})

router.get('/project-:id/get', async (req, res) => {
    const portfolioProject = await PortfolioProjects.findOne({ _id: req.params.id })
    res.send({
        success: true,
        data: portfolioProject,
        message: "Portfolio Project has been retrieved successfully"
    })
})

router.post('/add/apikey=:apikey', upload.fields([{ name: 'project_logo', maxCount: 10 }, { name: 'project_poster', maxCount: 10 }]), async (req, res) => {
    const { project_title, project_overview, project_lang, project_theme, project_theme_id, project_link, project_favourite, project_year } = req.body
    const configs = await Configs.findOne({ _id: "61bb0a67959494f1b8ba8375" })
    if (req.params.apikey === configs.api_key) {
        const project_posters = []
        req.files.project_poster.forEach(file => {
            project_posters.push(file.path)
        })
        new PortfolioProjects({
            project_poster: project_posters,
            project_title: project_title,
            project_overview: project_overview,
            project_lang: project_lang,
            project_logo: req.files ? req.files.project_logo[0].path : undefined,
            project_theme: project_theme,
            project_theme_id: project_theme_id,
            project_link: project_link,
            project_favourite: project_favourite,
            project_year: project_year
        }).save(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Portfolio Project has been added successfully"
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
        PortfolioProjects.findByIdAndRemove(_id).then(err => {
            if (!err) {
                res.send({
                    success: true,
                    message: "Portfolio Project has been deleted successfully"
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