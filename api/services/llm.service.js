const dbService = require('./db.service')
const aiUtilService = require('./ai-util.service')

const { ConversationalRetrievalQAChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const { PromptTemplate } = require('langchain/prompts')

const { VectorStoreToolkit, createVectorStoreAgent } = require('langchain/agents')

const dotenv = require('dotenv')
dotenv.config()

const LLM_MODEL = 'gpt-3.5-turbo-16k-0613'

module.exports = {
	queryChat,
	queryAgent,
}

async function queryChat(prompt, sessionData, contextType) {
	try {
		const promptFromTemplate = getPromptTemplate(contextType)
		const truncatedChatHistory = aiUtilService.truncateChatHistory(sessionData.chatHistory)
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: truncatedChatHistory,
			input: prompt,
		})
		const chain = await getChatChain(sessionData.namespace)
		const response = await chain.call({
			question: formattedPrompt,
			chat_history: truncatedChatHistory,
		})
		if (!response?.text) throw new Error('No response text')
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}

async function getChatChain(namespace) {
	try {
		const vectorStore = await dbService.getVectorStore(namespace)
		return ConversationalRetrievalQAChain.fromLLM(
			new ChatOpenAI({
				modelName: LLM_MODEL,
				temperature: 0,
			}),
			vectorStore.asRetriever(4),
			{
				returnSourceDocuments: true,
			}
		)
	} catch (error) {
		console.error('An error occurred while getting conversational retrieval chain:', error)
		throw error
	}
}

function getPromptTemplate(contextType) {
	return new PromptTemplate({
		inputVariables: ['chat_history', 'input'],
		template: `You are a """Friendly Monday.com Board AI Chatbot""" you will only answer as this role.
			
You must provide lots of specific details from the ${contextType} context provided.

History of our conversation:
{chat_history}
Current Conversation:
Human: {input}
AI:As a friendly Monday.com Board AI Chatbot with access to the user board context, I will do my best to give you an answer...(continue this line without writing it)`,
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
		const agent = await getAgent(sessionData.namespace)
		const response = await agent.call({ input: formattedPrompt })
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}
