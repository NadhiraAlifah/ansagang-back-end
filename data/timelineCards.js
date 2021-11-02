// const timelineCards = [
//     {
//         timelinecard_year: "2019",
//         timelinecard_action: "Thinked about IT sphere"
//     },
//     {
//         timelinecard_year: "2020",
//         timelinecard_action: "Started my Front-End journey"
//     },
//     {
//         timelinecard_year: "2021",
//         timelinecard_action: "Worked as a freelance developer"
//     },
//     {
//         timelinecard_year: "2022",
//         timelinecard_action: "Amongus"
//     },
//     {
//         timelinecard_year: "2023",
//         timelinecard_action: "Ansagang CEO"
//     }
// ]

// module.exports = timelineCards

const timelineCardsModel = require('../timelineCards.model.js')

module.exports = async() => {
    return await timelineCardsModel.find({})
}