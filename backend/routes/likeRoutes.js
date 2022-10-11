const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLike, deleteLike, getLikes } = require('../controllers/likeController')

router.post('/', protect, createLike)

router.delete('/:id', protect, deleteLike)

router.get('/', getLikes)

module.exports = router