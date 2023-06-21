const dbService = require('./db.service')
const { ConversationalRetrievalQAChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const { ConversationSummaryMemory } = require('langchain/memory')
const { PromptTemplate } = require('langchain/prompts')
const dotenv = require('dotenv')
dotenv.config()

const LLM_MODEL = 'gpt-3.5-turbo'

let gModel = null
let gChain = null
let gOptions = null
let gCallType = 'question'
let gHistoryType = 'chat_history'
let gChatHistory = ``

module.exports = {
	query,
	initializeVars,
}

async function query(prompt) {
	try {
		const promptFromTemplate = new PromptTemplate({
			inputVariables: ['chat_history', 'input'],
			template: `You are a """friendly monday board AI chatbot""" you will only answer as this role.
			
You must provide lots of specific details from the board context provided.

History of our conversation:
{chat_history}
Current Conversation:
Human: {input}
AI:`,
		})
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: gChatHistory,
			input: prompt,
		})
		const response = await gChain.call({ [gCallType]: formattedPrompt, [gHistoryType]: gChatHistory })
		console.log({
			output: response.text,
			sourceDocuments: response.sourceDocuments,
		})
		gChatHistory += `user:${prompt}\n`
		gChatHistory += `ai:${response?.text || response?.response}\n`
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}

async function getConversationalRetrievalChain() {
	try {
		const vectorStore = await dbService.getVectorStore()
		if (!gModel) {
			throw new Error('gModel is not initialized')
		}

		return ConversationalRetrievalQAChain.fromLLM(gModel, vectorStore.asRetriever(), {
			// k: 4,
			returnSourceDocuments: true,
		})
	} catch (error) {
		console.error('An error occurred while getting conversational retrieval chain:', error)
		throw error
	}
}

async function initializeVars({
	temperature = 0,
	streaming = false,
	queryVector = true,
	memoryOption = false,
}) {
	const newOptions = { temperature, streaming, queryVector, memoryOption }

	gOptions = newOptions
	const llmOptions = {
		modelName: LLM_MODEL,
		temperature,
		streaming,
		// callbacks: !streaming
		// 	? undefined
		// 	: [
		// 			{
		// 				handleLLMNewToken(token) {
		// 					sse.send(token, 'newToken')
		// 				},
		// 			},
		// 	  ],
	}

	gModel = new ChatOpenAI(llmOptions)
	gChain = await getConversationalRetrievalChain()
}

// async function getVectorChain() {
// 	try {
// const vectorStore = await dbService.getVectorStore(memoryOption)
// const vectorOptions = {
// 	k: 1,
// 	returnSourceDocuments: true,
// 	memory: undefined,
// }
// return VectorDBQAChain.fromLLM(gModel, vectorStore, vectorOptions)
// 	} catch (error) {
// 		console.error('An error occurred while getting vector chain:', error)
// 		throw error
// 	}
// }
