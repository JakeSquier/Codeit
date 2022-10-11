const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc     Register User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(
    async (req, res) => {
        const {username, picture, about, email, password} = req.body

        if(!username || !email || !password) {
            res.status(400)
            throw new Error('Please add required fields')
        }

        //check to see if user already exists
        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        //hash users password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create the new user
        const user = await User.create({
            username,
            picture,
            about,
            email,
            password: hashedPassword,
        })

        if(user) {
            res.status(201).json({
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
)

// @desc     Authenticate a user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(
    async (req, res) => {
        const {email, password} = req.body

        //check if user exists
        const user = await User.findOne({email})

        //compare entered password to stored password
        if(user && await (bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                admin: user.admin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    }
)

// @desc     Get user data
// @route    GET /api/users/me
// @access   Private
const getMe = asyncHandler( async (req, res) => {
    const { _id, username, email, picture, about } = await User.findById(req.user.id)
    
    //can also just pass in req.user to the json param rather than destructuring
    res.status(200).json({
        id: _id,
        username,
        email,
        picture,
        about
    })
})

//Generate JWT token for auth
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}