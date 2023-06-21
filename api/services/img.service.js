require('dotenv').config()
const storageService = require('./storage.service')
const fetch = require('cross-fetch')
const { query } = require('express')
const Replicate = require('replicate')
const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
	fetch,
})
async function genImg(prompt) {
	try {
		const output = await replicate.run(
			'cloneofsimo/realistic_vision_v1.3:db1c4227cbc7f985e335b2f0388cd6d3aa06d95087d6a71c5b3e07413738fa13',
			{
				input: {
					prompt: `perfect, best, high quality, ${prompt}, 8k high detail, trending, 2020, masterpiece, cinematic`,
					negative_prompt: `nude, naked, porn, lowres, low quality, blurry, disfigured, malformed, poorly hands, text, signature, watermark, logo, copyright, disfigured hands, duplicate`,
					width: 512,
					height: 512,
					num_outputs: 1,
					num_inference_steps: 40,
					guidance_scale: 4,
				},
			}
		)
		return output[0]
	} catch (err) {
		console.error('Failed to generate image', err)
		throw err
	}
}

async function uploadImg(imgUrl) {
	try {
		const newImgUrl = await storageService.uploadImg(imgUrl)

		return newImgUrl
	} catch (err) {
		console.error('cannot add image', err)
		throw err
	}
}

// getInsights()

// const gInsightQueries = [
// 	`What are the best/worst performer`,
// 	`What department shows best results`,
// 	`What type of tasks are most overdue`,
// 	`I'd love to know what I can improve in my work process`,
// 	`What is the most common roadblock for the team`,
// 	`What information is lacking in the team project structure, what is missing from Monday.com system`,
// 	`What information can be safely not recorded in Monday.com system`,
// ]
//copilot - chat with your monday board
//overdue = text, timeline
//who i need to fire - overdue, overall performance, how many story points, task and conversations
//where are my bottlenecks

//sales - leads what will be, help me model

const fs = require('fs').promises

async function loadJson(path) {
	let jsonFile = await fs.readFile(path, 'utf8')
	let demoBoard = JSON.parse(jsonFile)
	return demoBoard
}

// getInsights()
async function getInsights(rawBoard, query = `I'd love to know what I can improve in my work process`) {
	rawBoard = await loadJson('./api/ai/json/demo.json')
	const parsedBoard = parseBoard(rawBoard)
	const insightsPromises = boardQueries.map((insightQuery) => {
		return getInsight(parsedBoard, insightQuery)
	})
	const insights = await Promise.all(insightsPromises)
	// console.log('insights:', insights.join('\n'))
	// return insights.join('\n')
	// const insights = await getInsight(parsedBoard, query)
	return insights
}

function parseBoard(rawBoard) {
	const board = rawBoard[0]
	const overdue = parseForOverdue(board)
	const timeSpent = parseForTimeSpent(board)
	return [
		{ prompt: 'These are how many are overdue', boardPart: overdue },
		{ prompt: 'This is the average of how much time is spent:', boardPart: timeSpent },
	]
	// return JSON.stringify()
}

async function getInsight(parsedBoard, insightQuery) {
	const prompt = formatBoardInsightsPrompt(parsedBoard, insightQuery)
	const insight = await queryAi(prompt)
	const parsedInsight = praseInsight(insight)
	return parsedInsight
}

function praseInsight(insights) {
	return insights.split('\n').slice(0, 2).join('\n')
}

function formatBoardInsightsPrompt(parsedBoard, insightQuery) {
	const prompt = `Please provide insights about this monday board pertaining to the question """${insightQuery}""". Board: """${parsedBoard}""".`
	const qualifiers = `Make sure the insights are relevant to the topic and are not repetitive, keep it as specific as possible. Also, make sure the insights are short and concise. Give up to 2 insights.`
	const format = `<insight1>\n<insight2>`
	return formatPrompt(prompt, qualifiers, format)
}

function formatPrompt(prompt, qualifiers, format) {
	return `${prompt}\n\n${qualifiers}\n\nMake sure theThe final format should be exactly as follows: """${format}"""`
}

async function queryAi(prompt) {
	try {
		return await promptGpt(prompt)
	} catch (err) {
		console.error('Failed to query AI', err)
		throw err
	}
}
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function promptGpt(prompt) {
	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
		})

		const response = completion.data.choices[0].message.content
		return response
	} catch (error) {
		console.error(`Error in promptGpt function: ${error.message}`)
		throw error
	}
}

module.exports = {
	genImg,
	uploadImg,
	queryAi,
}

// 	const prompt = `Please provide 15 task names for a Monday board with the name "${boardName}". Please organize the tasks into three groups.`
// 		const qualifiers = `Make sure each group is unique. Each task name should be concise and relevant to the topic. Please include only the task names and group names in your response, as I will be parsing them using code.`
// 		const format = `<Number>: <Group Name>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>

// <Number>: <Group Name>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>

// <Number>: <Group Name>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>
// <Task Title>`
