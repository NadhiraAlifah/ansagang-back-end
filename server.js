const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const contact = require('./models/contactForm.model.js')
const app = express()
const PORT = 9000
const DBURL = 'mongodb+srv://admin:admin@cluster0.qesqn.mongodb.net/form?retryWrites=true&w=majority'

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

app.get('/api', (req, res) => res.status(200).send('Api is ready to work'))

app.get('/api/form', async (req, res) => { res.send(await contactForm()) })
app.post('/api/form', (req, res) => { new contact({ username: req.body.username, subject: req.body.subject, email: req.body.email, message: req.body.message }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/form-delete', async (req, res) => { await contact.deleteMany().then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/career-jobs', async (req, res) => { res.send(await careerJobs()) })
app.post('/api/career-jobs', (req, res) => { new careerJobsModel({ career_job_title: req.body.career_job_title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/career-jobs-delete', async (req, res) => { await careerJobsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/contact-details', async (req, res) => { res.send(await contactDetails()) })
app.post('/api/contact-details', (req, res) => { new contactDetailsModel({ contact_detail_link: req.body.contact_detail_link, contact_detail_title: req.body.contact_detail_title, contact_detail_value: req.body.contact_detail_value }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/contact-details-delete', async (req, res) => { await contactDetailsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} ) })

app.get('/api/portfolio-projects', async (req, res) => { res.send(await portfolioProjects()) })
app.get('/api/portfolio/project-:id', async (req, res) => {res.send(await portfolioProjectsModel.findOne({_id: req.params.id}))})
app.post('/api/portfolio-projects', (req, res) => { new portfolioProjectsModel({ project_title: req.body.project_title, project_overview: req.body.project_overview, project_poster: req.body.project_poster, project_lang: req.body.project_lang, project_logo: req.body.project_logo, project_theme: req.body.project_theme, project_theme_id: req.body.project_theme_id, project_link: req.body.project_link, project_favourite: req.body.project_favourite, project_year: req.body.project_year }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/portfolio-projects-delete', async (req, res) => { await portfolioProjectsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} ) })

app.get('/api/portfolio-projects-tabs', async (req, res) => { res.send(await portfolioProjectsTabs()) })
app.post('/api/portfolio-projects-tabs', (req, res) => { new portfolioProjectsTabsModel({ id: req.body.id, title: req.body.title }).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/portfolio-projects-tabs-delete', async (req, res) => { await portfolioProjectsTabsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} ) })

app.get('/api/questions-answers', async (req, res) => { res.send(await questionsanswers()) })
app.post('/api/questions-answers', async (req, res) => {new questionsanswersModel({question: req.body.question, answer: req.body.answer}).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/questions-answers-delete', async (req, res) => {await questionsanswersModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/skills-markup', async (req, res) => { res.send(await skillsMarkup()) })
app.post('/api/skills-markup', async (req, res) => {new skillsMarkupModel({skills_name: req.body.skills_name, skills_level: req.body.skills_level}).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/skills-markup-delete', async (req, res) => {await skillsMarkupModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/technologies', async (req, res) => { res.send(await technologies()) })
app.post('/api/technologies', async (req, res) => {new technologiesModel({id: req.body.id, title: req.body.title}).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/technologies-delete', async (req, res) => {await technologiesModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/technologies-items', async (req, res) => { res.send(await technologiesItems()) })
app.post('/api/technologies-items', async (req, res) => {new technologiesItemsModel({id: req.body.id, title: req.body.title, img: req.body.img}).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/technologies-items-delete', async (req, res) => {await technologiesItemsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/timeline-cards', async (req, res) => { res.send(await timelineCards()) })
app.post('/api/timeline-cards', async (req, res) => {new timelineCardsModel({timelinecard_year: req.body.timelinecard_year, timelinecard_action: req.body.timelinecard_action}).save(err => { if (!err) res.json({ success: true }); else res.json({ success: false, error: err }) }) })
app.post('/api/timeline-cards-delete', async (req, res) => {await timelineCardsModel.findByIdAndRemove(req.body._id).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/availability', async (req, res) => { res.send(await availability()) })
app.post('/api/availability', async (req, res) => {await availabilityModel.findByIdAndUpdate(req.body._id, {availability: req.body.availability}).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.get('/api/age', async (req, res) => { res.send(await age()) })
app.post('/api/age', async (req, res) => {await ageModel.findByIdAndUpdate(req.body._id, {age: req.body.age, date: req.body.date}).then(err => {if (!err) res.json({ success: true }); else res.json({ success: false, error: err })} )})

app.post('/api/password', async (req, res) => {
  const onePassword = await password()
  if (req.body.password === onePassword[onePassword.length - 1].password) {
    res.send('Password is correct')
  } else {
    res.send('Password is incorrect')
  }
})