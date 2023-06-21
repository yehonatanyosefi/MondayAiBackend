const dbService = require('../services/db.service')
const docService = require('../services/doc.service')
const llmService = require('../services/llm.service')
const imgService = require('../services/img.service')
const logger = require('../../services/logger.service')

async function promptAgent(req, res) {
	const { prompt, sessionData } = req.body
	try {
		const response = await llmService.queryAgent(prompt, sessionData)
		console.log(`response from agent:`, response)
		res.status(200).json(response)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}
async function prompt(req, res) {
	const { prompt, sessionData } = req.body
	console.log('file: ai.controller.js:20 -> sessionData:', sessionData)
	try {
		const response = await llmService.queryChat(prompt, sessionData)
		console.log(`response:`, response)
		res.status(200).json(response.text)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}

async function uploadBoard(req, res) {
	const { boardData, boardId } = req.body
	try {
		const rawBoard = JSON.stringify(boardData)
		const reducedBoard = await docService.getReducedText(rawBoard)
		await dbService.uploadToPinecone(reducedBoard, boardId)
		console.log('Board uploaded successfully')
		res.status(200).send({})
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Error uploading board' })
	}
}

async function postImg(req, res) {
	try {
		const { prompt } = req.body
		const imgUrl = await imgService.genImg(prompt)
		const newImgUrl = await imgService.uploadImg(imgUrl)
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

module.exports = {
	postImg,
	promptAgent,
	prompt,
	uploadBoard,
	// uploadPdf,
	// initializeVars,
}
