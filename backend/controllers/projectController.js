const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const User = require('../models/userModel')

// @desc     Create project
// @route    POST /api/projects
// @access   Public
const createProject = asyncHandler(
    async (req, res) => {
        const {user, projectName, categories, projectType, projectCode, public} = req.body

        if(!user || !projectName || !projectType || !projectCode ) {
            res.status(400)
            throw new Error('Please add all fields')
        }

        //create new project
        const project = Project.create({
            user, 
            projectName,
            categories: categories.split(' '),
            projectType,
            projectCode,
            public
        })

        if(project) {
            res.status(201).json(project)
        } else {
            res.status(400)
            throw new Error('Invalid project data')
        }
    }
)

// @desc     Update project
// @route    PUT /api/projects/:id
// @access   Private
const updateProject = asyncHandler(
    async (req, res) => {
        const project = await Project.findById(req.params.id)

        if(!project) {
            res.status(400)
            throw new Error('Project does not exist')
        }

        const user = await User.findById(req.user.id)

        //check to see if user exists
        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(project.user.toString() !== user.id ) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )

        res.status(200).json(updatedProject)
    }
)

// @desc     Delete project
// @route    Delete /api/projects/:id
// @access   Private
const deleteProject = asyncHandler(
    async (req, res) => {

        const project = await Project.findById(req.params.id)

        if(!project) {
            res.status(400)
            throw new Error('Project does not exist')
        }

        const user = await User.findById(req.user.id)

        //check to see if user exists
        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(project.user.toString() !== user.id ) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await project.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc     Get project
// @route    GET /api/projects/:id
// @access   Private
const getProject = asyncHandler(
    async (req, res) => {
        const project = await Project.findById(req.params.id)

        if(!project) {
            res.status(400)
            throw new Error('Project does not exist')
        }

        res.status(200).json(project)
    }
)

// @desc     Get all projects
// @route    GET /api/projects/
// @access   Public
const getAllProjects = asyncHandler(
    async (req, res) => {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try {
          let projects;
      
          if (qNew) {
            projects = await Project.find({ public: true }).sort({ createdAt: -1 }).limit(1);
          } else if (qCategory) {
            projects = await Project.find({
              categories: {
                $in: [qCategory],
              },
              public: true
            });
          } else {
            projects = await Project.find({ public: true });
          }
      
          res.status(200).json(projects);
        } catch (err) {
          res.status(500).json(err);
        }
    }
)

// @desc    Get user projects
// @route    GET /api/projects/user
// @access   Private
const getUsersProjects = asyncHandler( 
    async (req, res) => {
    
        const projects = await Project.find({ user: req.user.id })

        res.status(200).json(projects)
})

const getPublicProject = asyncHandler(
    async (req, res) => {

        const project = await Project.findById(req.params.id)

        if(!project) {
            res.status(400)
            throw new Error('Project does not exist')
        }

        if(project.public === false) {
            res.status(400)
            throw new Error('Project is private')
        }

        res.status(200).json(project)
    }
)

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getUsersProjects,
    getAllProjects,
    getPublicProject
}