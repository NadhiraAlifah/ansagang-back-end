import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import chalk from 'chalk'
import age from './routes/age.js'
import availability from './routes/availability.js'
import careerJobs from './routes/careerJobs.js'
import contactDetails from './routes/contactDetails.js'
import contactForm from './routes/contactForm.js'
import password from './routes/password.js'
import portfolioProjects from './routes/portfolioProjects.js'
import portfolioProjectsTabs from './routes/portfolioProjectsTabs.js'
import questionsAnswers from './routes/questionsAnswers.js'
import skillsMarkup from './routes/skillsMarkup.js'
import technologies from './routes/technologies.js'
import technologiesItems from './routes/technologiesItems.js'
import timelineCards from './routes/timelineCards.js'

const app = express()
const PORT = process.env.PORT || 9000
const DBURL = "mongodb+srv://admin:admin@cluster0.qesqn.mongodb.net/form?retryWrites=true&w=majority"

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
app.use('/api/age', age)
app.use('/api/availability', availability)
app.use('/api/careerJobs', careerJobs)
app.use('/api/contactDetails', contactDetails)
app.use('/api/contactForm', contactForm)
app.use('/api/password', password)
app.use('/api/portfolioProjects', portfolioProjects)
app.use('/api/portfolioProjectsTabs', portfolioProjectsTabs)
app.use('/api/questionsAnswers', questionsAnswers)
app.use('/api/skillsMarkup', skillsMarkup)
app.use('/api/technologies', technologies)
app.use('/api/technologiesItems', technologiesItems)
app.use('/api/timelineCards', timelineCards)