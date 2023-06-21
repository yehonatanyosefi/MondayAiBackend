const dbService = require('../services/db.service')
// const docService = require('../services/doc.service')
const llmService = require('../services/llm.service')
const aiService = require('./ai.service')
const logger = require('../../services/logger.service')

async function prompt(req, res) {
	const { prompt, sessionData } = req.body
	// const prompt = `What is the best insights I can get from this board?`
	try {
		const response = await llmService.query(prompt, sessionData)
		console.log(`response:`, response)
		res.status(200).json(response)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}
async function uploadBoard(req, res) {
	const { boardData, boardId } = req.body
	try {
		await dbService.uploadToPinecone(JSON.stringify(boardData), boardId)
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

module.exports = {
	postImg,
	prompt,
	uploadBoard,
	// uploadPdf,
	initializeVars,
}
