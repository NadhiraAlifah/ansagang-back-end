const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const contact = require('./models/contactForm.model.js')
const app = express()
const PORT = 9000
const DBURL = 'mongodb+srv://admin:admin@cluster0.qesqn.mongodb.net/form?retryWrites=true&w=majority'
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
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
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: fileFilter
})

const careerJobs = require('./data/careerJobs')
const contactForm = require('./data/contactForm')
const portfolioProjects = require('./data/portfolioProjects')
const skillsMarkup = require('./data/skillsMarkup')
const portfolioProjectsTabs = require('./data/portfolioProjectsTabs')
const technologiesItems = require('./data/technologiesItems')
const questionsanswers = require('./data/questionsanswers')
const timelineCards = require('./data/timelineCards')
const technologies = require('./data/technologies')
const contactDetails = require('./data/contactDetails')
const availability = require('./data/availability')
const password = require('./data/password')
const configs = require('./data/configs')
const age = require('./data/age')

const careerJobsModel = require('./models/careerJobs.model.js')
const ageModel = require('./models/age.model.js')
const contactDetailsModel = require('./models/contactDetails.model.js')
const portfolioProjectsModel = require('./models/portfolioProjects.model.js')
const portfolioProjectsTabsModel = require('./models/portfolioProjectsTabs.model.js')
const questionsanswersModel = require('./models/questionsanswers.model.js')
const skillsMarkupModel = require('./models/skillsMarkup.model.js')
const technologiesModel = require('./models/technologies.model.js')
const technologiesItemsModel = require('./models/technologiesItems.model.js')
const timelineCardsModel = require('./models/timelineCards.model.js')
const availabilityModel = require('./models/availability.model.js')

app.listen(PORT, () => {
  console.log(chalk.green(`Listening on port ${PORT}`))
  mongoose
    .connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(
      _ => {
        console.log(chalk.green('Succesfully connected to database'))
      },
      err => {
        console.log(chalk.red(err))
      }
    )
})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/api', (req, res) => res.status(200).send('Api is ready to work'))
app.get('/api/form', async (req, res) => {
  res.send(await contactForm())
})
app.post('/api/form/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new contact({ username: req.body.username, subject: req.body.subject, email: req.body.email, message: req.body.message }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/form-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await contact.deleteMany().then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/career-jobs', async (req, res) => { res.send(await careerJobs()) })
app.post('/api/career-jobs/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new careerJobsModel({ career_job_title: req.body.career_job_title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/career-jobs-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await careerJobsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/contact-details', async (req, res) => { res.send(await contactDetails()) })
app.post('/api/contact-details/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new contactDetailsModel({ contact_detail_link: req.body.contact_detail_link, contact_detail_title: req.body.contact_detail_title, contact_detail_value: req.body.contact_detail_value }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/contact-details-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await contactDetailsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/portfolio-projects', async (req, res) => { res.send(await portfolioProjects()) })
app.get('/api/portfolio/project-:id', async (req, res) => { res.send(await portfolioProjectsModel.findOne({ _id: req.params.id })) })
app.post('/api/portfolio-projects/apikey=:apikey', upload.fields([{ name: 'project_logo', maxCount: 10 }, { name: 'project_poster', maxCount: 10 }]), async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    project_posters = [], req.files.project_poster.forEach(file => { project_posters.push(file.path) }), new portfolioProjectsModel({ project_poster: project_posters, project_title: req.body.project_title, project_overview: req.body.project_overview, project_lang: req.body.project_lang, project_logo: req.files ? req.files.project_logo[0].path : undefined, project_theme: req.body.project_theme, project_theme_id: req.body.project_theme_id, project_link: req.body.project_link, project_favourite: req.body.project_favourite, project_year: req.body.project_year }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/portfolio-projects-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await portfolioProjectsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/portfolio-projects-tabs', async (req, res) => { res.send(await portfolioProjectsTabs()) })
app.post('/api/portfolio-projects-tabs/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new portfolioProjectsTabsModel({ id: req.body.id, title: req.body.title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/portfolio-projects-tabs-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await portfolioProjectsTabsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/questions-answers', async (req, res) => { res.send(await questionsanswers()) })
app.post('/api/questions-answers/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new questionsanswersModel({ question: req.body.question, answer: req.body.answer }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/questions-answers-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await questionsanswersModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/skills-markup', async (req, res) => { res.send(await skillsMarkup()) })
app.post('/api/skills-markup/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new skillsMarkupModel({ skills_name: req.body.skills_name, skills_level: req.body.skills_level }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/skills-markup-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await skillsMarkupModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/technologies', async (req, res) => { res.send(await technologies()) })
app.post('/api/technologies/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new technologiesModel({ id: req.body.id, title: req.body.title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/technologies-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await technologiesModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/technologies-items', async (req, res) => { res.send(await technologiesItems()) })
app.post('/api/technologies-items/apikey=:apikey', upload.single('img'), async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new technologiesItemsModel({ id: req.body.id, title: req.body.title, img: req.file ? req.file.path : null }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/technologies-items-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await technologiesItemsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/timeline-cards', async (req, res) => { res.send(await timelineCards()) })
app.post('/api/timeline-cards/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    new timelineCardsModel({ timelinecard_year: req.body.timelinecard_year, timelinecard_action: req.body.timelinecard_action }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})
app.post('/api/timeline-cards-delete/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await timelineCardsModel.findByIdAndRemove(req.body._id).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/availability', async (req, res) => { res.send(await availability()) })
app.post('/api/availability/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await availabilityModel.findByIdAndUpdate(req.body._id, { availability: req.body.availability }).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.get('/api/age', async (req, res) => { res.send(await age()) })
app.post('/api/age/apikey=:apikey', async (req, res) => {
  const apikey = await configs()
  if (req.params.apikey === apikey[apikey.length - 1].api_password) {
    await ageModel.findByIdAndUpdate(req.body._id, { age: req.body.age, date: req.body.date }).then(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) })
  }
})

app.post('/api/password', async (req, res) => {
  const onePassword = await password()
  if (req.body.password === onePassword[onePassword.length - 1].password) {
    res.send('Password is correct')
  } else {
    res.send('Password is incorrect')
  }
})