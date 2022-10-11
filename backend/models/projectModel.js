const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    projectName: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
    projectType: {
        type: String,
        required: true
    },
    projectCode: {
        type: Array,
        required: [true, 'Please add project code']
    },
    public: {
        type: Boolean,
        default: false
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model('Project', projectSchema)