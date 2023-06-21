require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function chatGpt(messages, temperature = 0) {
	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages,
			temperature,
		})
		const response = completion.data.choices[0].message.content
		return response
	} catch (error) {
		console.error(`Error in promptGpt function: ${error.message}`)
		throw error
	}
}

async function chatWithGpt(messages) {
	try {
		const content = await chatGpt(messages)
		if (!content) {
			throw new Error('Failed to get content from GPT')
		}
		return content
	} catch (error) {
		console.error(`Error in gpt function: ${error.message}`)
		throw new Error(error)
	}
}

function addUserMsg(messages, userContent) {
	const userMsg = {
		role: 'user',
		content: userContent,
	}
	messages.push(userMsg)
	return messages
}

function addAssistantMsg(messages, assistantContent) {
	const assistantMsg = {
		role: 'assistant',
		content: assistantContent,
	}
	messages.push(assistantMsg)
	return messages
}

async function useChatGpt(messageTrail) {
	try {
		const systemPrompt = ``
		const prompt = `Please provide ? delimited by the triple backticks.`
		const qualifiers = `Make sure each ? is unique.`
		const format = `<>`
		const messages = [
			{
				role: 'system',
				content: prompt,
			},
			...messageTrail,
		]
	} catch (err) {
		console.error('Error in using gpt:', err)
		throw err
	}
}
