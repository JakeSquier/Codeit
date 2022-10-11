const mongoose = require('mongoose')

const projectPublicSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    categories: {
        type: Array,
        default: []
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model('ProjectPublic', projectPublicSchema)