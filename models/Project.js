const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },
    participant: {
        type: Array,
        default: []
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
    user_id: {
        type: String,
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project}