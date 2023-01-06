const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema ({
    title: String,
    runtime: String,
    review: String,
    img: String,
    trailer: String
})

const Movies = mongoose.model('Movies', MovieSchema)

module.exports = Movies