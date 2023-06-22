const express = require('express')
const {
	postImg,
	promptBoard,
	promptActivity,
	promptUpdate,
	promptAgent,
	uploadJSON,
} = require('./ai.controller')
const router = express.Router()

// router.post('/genImg', postImg)
router.post('/prompt/agent', promptAgent)
router.post('/prompt/board', promptBoard)
router.post('/prompt/activity', promptActivity)
router.post('/prompt/update', promptUpdate)
router.post('/upload/board', uploadJSON)
router.post('/upload/activity', uploadJSON)

module.exports = router

// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
