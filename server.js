const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const contact = require('./contactForm.model.js')
const app = express()
const PORT = 9000
const DBURL =
  'mongodb+srv://admin:admin@cluster0.qesqn.mongodb.net/form?retryWrites=true&w=majority'
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
const careerJobsModel = require('./careerJobs.model.js')
const contactDetailsModel = require('./contactDetails.model.js')
const portfolioProjectsModel = require('./portfolioProjects.model.js')

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

app.get('/api', (req, res) => res.status(200).send('Api is ready to work'))

app.get('/api/form', async (req, res) => { res.send(await contactForm()) })
app.post('/api/form', (req, res) => {new contact({username: req.body.username,subject: req.body.subject,email: req.body.email,message: req.body.message}).save(err => {if (!err) res.json({ success: true });else res.json({ success: false, error: err })})})
app.post('/api/form-delete', async (req, res) => {await contact.findByIdAndRemove(req.body._id)})

app.get('/api/career-jobs', async (req, res) => { res.send(await careerJobs()) })
app.post('/api/career-jobs', (req, res) => {new careerJobsModel({career_job_title: req.body.career_job_title}).save(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })})})
app.post('/api/career-jobs-delete', async (req, res) => {await careerJobsModel.findByIdAndRemove(req.body._id)})

app.get('/api/contact-details', async (req, res) => { res.send(await contactDetails()) })
app.post('/api/contact-details', (req, res) => {new contactDetailsModel({contact_detail_link: req.body.contact_detail_link, contact_detail_title: req.body.contact_detail_title, contact_detail_value: req.body.contact_detail_value}).save(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })})})
app.post('/api/contact-details-delete', async (req, res) => {await contactDetailsModel.findByIdAndRemove(req.body._id)})

app.get('/api/portfolio-projects', async (req, res) => { res.send(await portfolioProjects()) })
app.post('/api/portfolio-projects', (req, res) => {new portfolioProjectsModel({project_title: req.body.project_title, project_overview: req.body.project_overview, project_poster: req.body.project_poster, project_lang: req.body.project_lang, project_logo: req.body.project_logo, project_theme: req.body.project_theme, project_theme_id: req.body.project_theme_id, project_link: req.body.project_link, project_favourite: req.body.project_favourite, project_id: req.body.project_id}).save(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })})})
app.post('/api/portfolio-projects-delete', async (req, res) => {await portfolioProjectsModel.findByIdAndRemove(req.body._id)})

app.get('/api/portfolio-projects-tabs', async (req, res) => { res.send(await portfolioProjectsTabs()) })

app.get('/api/questions-answers', async (req, res) => { res.send(await questionsanswers()) })

app.get('/api/skills-level', async (req, res) => { res.send(await skillsMarkup()) })

app.get('/api/technologies', async (req, res) => { res.send(await technologies()) })

app.get('/api/technologies-items', async (req, res) => { res.send(await technologiesItems()) })

app.get('/api/timeline', async (req, res) => { res.send(await timelineCards()) })

app.get('/api/availability', async (req, res) => { res.send(await availability()) })

app.post('/api/password', async (req, res) => {
  const onePassword = await password()
  if (req.body.password === onePassword[0].password) {
    res.send('Password is correct')
  } else {
    res.send('Password is incorrect')
  }
})