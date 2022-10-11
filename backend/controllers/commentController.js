const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Project = require('../models/projectModel')
const Comment = require('../models/commentModel')

// @desc     Create comment
// @route    POST /api/comments
// @access   Private
const createComment = asyncHandler(
    async (req, res) => {
        const {user, project, content} = req.body

        if(!user || !project || !content) {
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

        const comment = Comment.create({
            user,
            project,
            content
        })

        if(comment){
            res.status(201).json(comment)
        } else {
            res.status(400)
            throw new Error('Invalid comment data')
        }
    }
)

// @desc     Update comment
// @route    PUT /api/comments/:id
// @access   Private
const updateComment = asyncHandler(
    async (req, res) => {
        const comment = await Comment.findById(req.params.id)

        if(!comment) {
            res.status(401)
            throw new Error('Comment not found')
        }

        const user = await User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(comment.user.toString() !== user.id ) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )

        res.status(200).json(updatedComment)
    }
)

// @desc     Delete comment
// @route    DELETE /api/comments/:id
// @access   Private
const deleteComment = asyncHandler(
    async (req, res) => {
        const comment = await Comment.findById(req.params.id)

        if(!comment) {
            res.status(401)
            throw new Error('Comment not found')
        }

        const user = await User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(comment.user.toString() !== user.id ) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await comment.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc     Get comments
// @route    GET /api/comments/project
// @access   Public
const getComments = asyncHandler(
    async (req, res) => {
        const {project} = req.body

        const _project = Project.findById(project)

        if(!_project) {
            res.status(401)
            throw new Error('Project not found')
        }

        const comments = await Comment.find({ project: project })

        res.status(200).json(comments)
    }
)

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments
}