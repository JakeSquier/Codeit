const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
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
    content: {
        type: String,
        required: true
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model('Comment', commentSchema)