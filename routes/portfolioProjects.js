import express from 'express'
import PortfolioProjects from '../models/portfolioProjects.model.js'
import Configs from '../models/configs.model.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimitype === 'image/jpeg' || file.mimitype === 'image/png' || file.mimitype === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, true)
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
    res.send(portfolioProjects)
})

router.get('/project-:id/get', async (req, res) => {
    res.send(await PortfolioProjects.find({ _id: req.params.id}))
})

router.post('/add/apikey=:apikey', upload.fields([{ name: 'project_logo', maxCount: 10 }, { name: 'project_poster', maxCount: 10 }]), async (req, res) => {
    const { project_title, project_overview, project_lang, project_theme, project_theme_id, project_link, project_favourite, project_year } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        const project_posters = []
        req.files.project_poster.forEach(file => { project_posters.push(file.path) })
        new PortfolioProjects({ project_poster: project_posters, project_title: project_title, project_overview: project_overview, project_lang: project_lang, project_logo: req.files ? req.files.project_logo[0].path : undefined, project_theme: project_theme, project_theme_id: project_theme_id, project_link: project_link, project_favourite: project_favourite, project_year: project_year }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

router.post('/delete/apikey=:apikey', async (req, res) => {
    const { _id } = req.body
    const apikey = await Configs.find({})
    if (req.params.apikey === apikey[apikey.length - 1].api_password) {
        PortfolioProjects.findByIdAndRemove(_id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
    }
})

export default router