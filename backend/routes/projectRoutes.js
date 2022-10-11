const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createProject, 
        updateProject, 
        deleteProject, 
        getProject, 
        getUsersProjects,
        getAllProjects,
        getPublicProject
} = require('../controllers/projectController')

router.post('/', protect, createProject)

router.get('/user', protect, getUsersProjects)

router.get('/', getAllProjects)

router.get('/:id', getPublicProject)

router.get('/private/:id', protect, getProject)

router.put('/:id', protect, updateProject)

router.delete('/:id', protect, deleteProject)

module.exports = router