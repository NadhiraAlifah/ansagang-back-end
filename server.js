const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const contact = require('./contact.model.js');
const app = express();
const PORT = 9000;
const DBURL = 'mongodb+srv://admin:admin@cluster0.qesqn.mongodb.net/form?retryWrites=true&w=majority';
const careerJobs = require('./data/careerJobs')
const portfolioProjects = require('./data/portfolioProjects')
const skillsMarkup = require('./data/skillsMarkup')
const technologies = require('./data/technologies')
const technologiesItems = require('./data/technologiesItems')
const questionsanswers = require('./data/questionsanswers')
const timelineCards = require('./data/timelineCards')

app.listen(PORT, () => {
  console.log(chalk.green(`Listening on port ${PORT}`))
  mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(_ => {
      console.log(chalk.green('Succesfully connected to database'))
  }, err => {
      console.log(chalk.red(err))
  })
})

app.use(express.json())
app.use(cors())

app.post('/api/form', (req, res) => {
  new contact({
    username: req.body.username,
    subject: req.body.subject,
    email: req.body.email,
    message: req.body.message
  }).save((err) => {
    if(!err) res.json({success: true})
    else res.json({success: false, error: err})
  })
})

app.get('/api/career-jobs', (req, res) => res.status(200).send(careerJobs))
app.get('/api/portfolio-projects', (req, res) => res.status(200).send(portfolioProjects))
app.get('/api/skills-level', (req, res) => res.status(200).send(skillsMarkup))
app.get('/api/technologies', (req, res) => res.status(200).send(technologies))
app.get('/api/technologies-items', (req, res) => res.status(200).send(technologiesItems))
app.get('/api/questions-answers', (req, res) => res.status(200).send(questionsanswers))
app.get('/api/timeline', (req, res) => res.status(200).send(timelineCards))