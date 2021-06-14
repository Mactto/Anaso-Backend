const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },
    participant: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: String
        
    },
    thumbnail: {
        type: String
    },
    role: {
        type: String
    },
    explanation: {
        type: String,
        maslength: 1000
    },
})

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project}