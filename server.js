import express from 'express'
import mongoose from 'mongoose'

import { careerJobs } from './data.js'
import { portfolioProjects } from './data.js'
import { skillsMarkup } from './data.js'
import { technologies } from './data.js'
import { technologiesItems } from './data.js'
import { questionsanswers } from './data.js'
import { timelineCards } from './data.js'

const app = express()
const port = process.env.PORT || 9000;

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
        res.setHeader("Access-Control-Allow-Headers", "*"),
        next();
})

app.get('/', (req, res) => res.status(200).send('ansagang'))

app.get('/api/career-jobs', (req, res) => res.status(200).send(careerJobs))

app.get('/api/portfolio-projects', (req, res) => res.status(200).send(portfolioProjects))

app.get('/api/skills-level', (req, res) => res.status(200).send(skillsMarkup))

app.get('/api/technologies', (req, res) => res.status(200).send(technologies))

app.get('/api/technologies-items', (req, res) => res.status(200).send(technologiesItems))

app.get('/api/questions-answers', (req, res) => res.status(200).send(questionsanswers))

app.get('/api/timeline', (req, res) => res.status(200).send(timelineCards))

app.listen(port, () => console.log(`listening on localhost:${port}`))