const express = require('express')
const {
	postImg,
	promptActivity,
	promptBoard,
	promptAgent,
	uploadBoard,
	uploadActivity,
} = require('./ai.controller')
const router = express.Router()

// router.post('/genImg', postImg)
router.post('/prompt/agent', promptAgent)
router.post('/prompt/board', promptBoard)
router.post('/prompt/activity', promptActivity)
router.post('/upload/board', uploadBoard)
router.post('/upload/activity', uploadActivity)

module.exports = router

// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
