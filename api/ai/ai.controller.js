const dbService = require('../services/db.service')
const docService = require('../services/doc.service')
const llmService = require('../services/llm.service')
const imgService = require('../services/img.service')
const agentService = require('../services/agent.service')
const logger = require('../../services/logger.service')
// const PROMPT_TO_SEND = `What are some potential bottlenecks in our current workflow?`
// promptBoard(
// 	{
// 		body: {
// 			prompt: PROMPT_TO_SEND,
// 			sessionData: {
// 				namespace: '4671780737',
// 				chatHistory: [
// 					{
// 						Human: PROMPT_TO_SEND,
// 					},
// 				],
// 			},
// 		},
// 	},
// 	{ status: () => {}, json: () => {} }
// )
// promptAgent(
// 	{
// 		body: {
// 			prompt: 'what are the best insights i can get from the board',
// 			sessionData: { namespace: '4680419653', chatHistory: [{ Human: 'hi' }] },
// 		},
// 	},
// 	{ status: () => {}, json: () => {} }
// )
async function promptAgent(req, res) {
	const { prompt, sessionData } = req.body
	try {
		const response = await agentService.queryAgent(prompt, sessionData)
		if (response === 'Agent stopped due to max iterations.') {
			promptChat(req, res)
			return
		}
		res.status(200).json(response)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to run agent' })
	}
}

async function promptUpdate(req, res) {
	const { prompt, sessionData } = req.body
	try {
		const response = await llmService.queryChat(prompt, sessionData, 'item updates of monday.com board')
		res.status(200).json(response.text)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}

async function promptBoard(req, res) {
	const { prompt, sessionData } = req.body
	try {
		const response = await llmService.queryChat(prompt, sessionData, 'monday.com board')
		console.log(`response:`, response.text)
		res.status(200).json(response.text)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}

async function promptActivity(req, res) {
	const { prompt, sessionData } = req.body
	console.log("file: ai.controller.js:65 -> promptActivity -> prompt:", prompt)
	console.log("file: ai.controller.js:65 -> promptActivity -> sessionData:", sessionData)
	try {
		const response = await llmService.queryChat(prompt, sessionData, 'activity log of monday.com board')
		res.status(200).json(response.text)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to get insights' })
	}
}

async function uploadJSON(req, res) {
	const { data, namespace } = req.body
	console.log("file: ai.controller.js:78 -> uploadActivity -> namespace:", namespace)
	console.log("file: ai.controller.js:78 -> uploadActivity -> data:", data)

	try {
		const stringJSON = JSON.stringify(data)
		const reducedJSON = await docService.getReducedText(stringJSON)
		await dbService.uploadToPinecone(reducedJSON, namespace)
		console.log('Data uploaded successfully')
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

module.exports = {
	postImg,
	promptAgent,
	promptBoard,
	promptActivity,
	promptUpdate,
	uploadJSON,
}
