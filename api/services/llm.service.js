const dbService = require('./db.service')
const aiUtilService = require('./ai-util.service')

const { ConversationalRetrievalQAChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const { PromptTemplate } = require('langchain/prompts')

const { VectorStoreToolkit, createVectorStoreAgent, VectorStoreInfo } = require('langchain/agents')

const dotenv = require('dotenv')
dotenv.config()

const LLM_MODEL = 'gpt-3.5-turbo-16k'

module.exports = {
	queryChat,
	queryAgent,
}

async function queryChat(prompt, sessionData) {
	try {
		const promptFromTemplate = getPromptTemplate()
		const truncatedChatHistory = aiUtilService.truncateChatHistory(sessionData.chatHistory)
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: truncatedChatHistory,
			input: prompt,
		})
		const chain = await getConversationalRetrievalChain(sessionData.boardId)
		const response = await chain.call({
			question: formattedPrompt,
			chat_history: truncatedChatHistory,
		})
		// console.log({
		// 	output: response.text,
		// 	sourceDocuments: response.sourceDocuments,
		// })
		if (!response?.text) throw new Error('No response text')
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}

async function getConversationalRetrievalChain(boardId) {
	try {
		const vectorStore = await dbService.getVectorStore(boardId)
		// return VectorDBQAChain.fromLLM(
		// 	new ChatOpenAI({
		// 		modelName: LLM_MODEL,
		// 		temperature: 0,
		// 	}),
		// 	vectorStore,
		// 	{
		// 		k: 1,
		// 		returnSourceDocuments: true,
		// 	}
		// )
		return ConversationalRetrievalQAChain.fromLLM(
			new ChatOpenAI({
				modelName: LLM_MODEL,
				temperature: 0,
			}),
			vectorStore.asRetriever(),
			{
				// k: 4,
				returnSourceDocuments: true,
			}
		)
	} catch (error) {
		console.error('An error occurred while getting conversational retrieval chain:', error)
		throw error
	}
}

function getPromptTemplate() {
	return new PromptTemplate({
		inputVariables: ['chat_history', 'input'],
		template: `You are a """friendly monday board AI chatbot""" you will only answer as this role.
			
You must provide lots of specific details from the board context provided.

History of our conversation:
{chat_history}
Current Conversation:
Human: {input}
AI:`,
	})
}

async function getAgent(namespace) {
	try {
		const vectorStore = await dbService.getVectorStore(namespace)
		const model = new ChatOpenAI({
			modelName: LLM_MODEL,
			temperature: 0,
		})
		const vectorStoreInfo = {
			name: 'board_vector_store',
			description: 'Vector store for the board',
			vectorStore,
		}
		const toolkit = new VectorStoreToolkit(vectorStoreInfo, model)
		const agent = createVectorStoreAgent(model, toolkit)
		return agent
	} catch (error) {
		console.error('An error occurred while getting agent:', error)
		throw error
	}
}

async function queryAgent(prompt, sessionData) {
	try {
		const truncatedChatHistory = aiUtilService.truncateChatHistory(sessionData.chatHistory)
		const promptFromTemplate = getPromptTemplate()
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: JSON.stringify(truncatedChatHistory),
			input: prompt,
		})
		const agent = await getAgent(sessionData.boardId)
		const response = await agent.call({ input: formattedPrompt })
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}
