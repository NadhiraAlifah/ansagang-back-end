import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Form from './models/formModel.js'

import { careerJobs } from './data.js'
import { portfolioProjects } from './data.js'
import { skillsMarkup } from './data.js'
import { technologies } from './data.js'
import { technologiesItems } from './data.js'
import { questionsanswers } from './data.js'
import { timelineCards } from './data.js'

const app = express()
const port = process.env.PORT || 9000;

const connection_URL = 'mongodb+srv://admin:admin@cluster0.pn3q6.mongodb.net/formDB?retryWrites=true&w=majority'

mongoose.connect(connection_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, _ => {
    console.log('DB connected');
}, err => {
    console.log('error ' + err)
})

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => res.status(200).send('ansagang'))

app.get('/api/career-jobs', (req, res) => res.status(200).send(careerJobs))

app.get('/api/portfolio-projects', (req, res) => res.status(200).send(portfolioProjects))

app.get('/api/skills-level', (req, res) => res.status(200).send(skillsMarkup))

app.get('/api/technologies', (req, res) => res.status(200).send(technologies))

app.get('/api/technologies-items', (req, res) => res.status(200).send(technologiesItems))

app.get('/api/questions-answers', (req, res) => res.status(200).send(questionsanswers))

app.get('/api/timeline', (req, res) => res.status(200).send(timelineCards))

app.get('/api/form', (req, res) => {
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
})

app.post('/api/form', (req, res) => {
    const username = req.body.username
    const subject = req.body.subject
    const email = req.body.email
    const message = req.body.message
    new Form({
        username: username,
        subject: subject,
        email: email,
        message: message
    }).save(err => {
        console.log(err)
        if(err) res.json(err)
        else res.json('success true')
    })
})

app.listen(port, () => console.log(`listening on localhost:${port}`))