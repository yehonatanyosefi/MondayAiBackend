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
router.post('/promptAgent', promptAgent)
router.post('/promptBoard', promptBoard)
router.post('/promptActivity', promptActivity)
router.post('/uploadBoard', uploadBoard)
router.post('/uploadActivity', uploadActivity)

module.exports = router

// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
