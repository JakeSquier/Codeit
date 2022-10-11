const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createComment, 
        updateComment, 
        deleteComment, 
        getComments
} = require('../controllers/commentController')

router.post('/', protect, createComment)

router.put('/:id', protect, updateComment)

router.delete('/:id', protect, deleteComment)

router.get('/', getComments)

module.exports = router