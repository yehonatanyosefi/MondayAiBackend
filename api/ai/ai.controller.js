const dbService = require('../services/db.service')
const docService = require('../services/doc.service')
const llmService = require('../services/llm.service')
const fs = require('fs').promises
const aiService = require('./ai.service')
const logger = require('../../services/logger.service')

let gInitialized = false
const DEMO_PROMPT = `what are the most important tasks I have?`

async function loadJson(path) {
	let jsonFile = await fs.readFile(path, 'utf8')
	let demoBoard = JSON.parse(jsonFile)
	return demoBoard
}

async function prompt(req, res) {
	const { prompt } = req?.body || { prompt: DEMO_PROMPT }
	try {
		if (!gInitialized) await initializeVars()
		const response = await llmService.query(prompt)
		console.log(`response:`, response)
		// res.status(200).json(response)
	} catch (err) {
		console.log(err)
		// res.status(500).json({ message: 'Failed to get insights' })
	}
}
async function uploadBoard(req, res) {
	const DEMO_BOARD = await loadJson('./api/ai/json/demo.json')
	const { boardData } = req?.body || { boardData: JSON.stringify(DEMO_BOARD) }
	try {
		await dbService.uploadToPinecone(boardData)
		console.log('Board uploaded successfully')
	} catch (err) {
		console.log(err)
		// res.status(500).json({ message: 'Error uploading board' })
	}
}

async function postImg(req, res) {
	try {
		const { prompt } = req.body
		const imgUrl = await aiService.genImg(prompt)
		const newImgUrl = await aiService.uploadImg(imgUrl)
		res.json(newImgUrl)
	} catch (err) {
		logger.error('Failed to post image', err)
		res.status(500).send({ err: 'Failed to post image' })
	}
}

// async function uploadPdf(files) {
// 	try {
// 		const reducedChunks = await docService.getReduceDocs(files)
// 		await dbService.uploadToPinecone(reducedChunks)
// 		console.log('Pdfs uploaded successfully')
// 	} catch (err) {
// 		console.log(err)
// 		// res.status(500).json({ message: 'Error uploading pdf' })
// 	}
// }

async function initializeVars(
	temperature = 0,
	streaming = false,
	queryVector = false,
	memoryOption = false
) {
	try {
		await llmService.initializeVars({ temperature, streaming, queryVector, memoryOption })
		gInitialized = true
	} catch (error) {
		console.error('Error initializing variables', error)
		throw error
	}
}

module.exports = {
	postImg,
	prompt,
	uploadBoard,
	// uploadPdf,
	initializeVars,
}
