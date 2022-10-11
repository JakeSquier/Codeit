const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [ true, 'Please add a name']
    },
    picture: {
        type: String,
        default: 'pic'
    },
    about: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'Please add an email']
    },
    password: {
        type: String,
        required: [ true, 'Please add a password']
    },
}, {
    timeStamps: true
})

module.exports = mongoose.model('User', userSchema)