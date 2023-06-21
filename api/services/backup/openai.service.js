const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function getInsights(rawBoard) {
	const boardQueries = parseBoard(rawBoard)
	const insightsPromises = boardQueries.map((boardQueryObj) => {
		const { boardPart, prompt } = boardQueryObj
		return getInsight(boardPart, prompt)
	})
	const insights = await Promise.all(insightsPromises)
	return insights.join('\n')
}
// async function getInsights(rawBoard, query = `I'd love to know what I can improve in my work process`) {
// 	const parsedBoard = parseBoard(rawBoard)
// 	const insights = await getInsight(parsedBoard, query)
// 	return insights
// }

async function getInsight(parsedBoard, insightQuery) {
	const prompt = formatBoardInsightsPrompt(parsedBoard, insightQuery)
	const insight = await queryAi(prompt)
	const parsedInsight = praseInsight(insight)
	return parsedInsight
}

function praseInsight(insights) {
	return insights.split('\n').slice(0, 2).join('\n')
}

function parseBoard(rawBoard) {
	const board = rawBoard[0]
	const overdue = parseForOverdue(board)
	const timeSpent = parseForTimeSpent(board)
	return [
		{ prompt: 'These are how many are overdue', boardPart: overdue },
		{ prompt: 'This is the average of how much time is spent:', boardPart: timeSpent },
	]
	// return JSON.stringify(board)
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

		if (!response) {
			throw new Error('Failed to get content from GPT')
		}
		const aiRegex = /sorry, as an ai language model/i
		const isInvalid = aiRegex.test(response)
		if (isInvalid) {
			throw new Error('Invalid answer')
		}
		return response
	} catch (error) {
		console.error(`Error in promptGpt function: ${error.message}`)
		throw error
	}
}

export const openaiService = {
	getInsights,
}
