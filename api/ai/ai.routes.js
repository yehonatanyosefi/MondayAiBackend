const express = require('express')
const { postImg, uploadBoard, prompt } = require('./ai.controller')
const router = express.Router()

// router.post('/genImg', postImg)
router.post('/prompt', prompt)
router.post('/uploadBoard', uploadBoard)
module.exports = router

// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
