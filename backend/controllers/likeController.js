const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Project = require('../models/projectModel')
const Like = require('../models/likeModel')

// @desc     Create like
// @route    POST /api/likes
// @access   Private
const createLike = asyncHandler(
    async (req, res) => {
        const { user, project } = req.body

        if(!user || !project ) {
            res.status(400)
            throw new Error('Invalid data')
        }

        const _user = await User.findById(user)

        if(!_user) {
            res.status(401)
            throw new Error('User not found')
        }

        const _project = await Project.findById(project)

        if(!_project) {
            res.status(401)
            throw new Error('Project not found')
        }

        const like = Like.create({
            user,
            project
        })

        res.status(201).json(like)
    }
)

// @desc     delete like
// @route    DELETE /api/likes/:id
// @access   Private
const deleteLike = asyncHandler(
    async (req, res) => {
        
        const like = await Like.findById(req.params.id)

        if(!like) {
            res.status(401)
            throw new Error('Like not found')
        }

        const user = await User.findById(like.user)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(like.user.toString() !== user.id ) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await like.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc     get likes
// @route    GET /api/likes/project
// @access   Public
const getLikes = asyncHandler(
    async (req, res) => {
        const {project} = req.body

        const _project = Project.findById(project)

        if(!_project) {
            res.status(401)
            throw new Error('Project not found')
        }

        const likes = await Like.find({ project: project })

        res.status(200).json(likes)
    }
)

module.exports = {
    createLike,
    deleteLike,
    getLikes
}