const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
}, {
    timeStamps: true
})

module.exports = mongoose.model('Like', likeSchema)