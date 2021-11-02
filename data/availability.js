// const availability = {
//     availability: 'busy'
//     // availability: 'free'
// }

// module.exports = availability

const availabilityModel = require('../availability.model.js')

module.exports = async() => {
    return await availabilityModel.find({})
}

