const dbService = require('./db.service')
// const { ConversationalRetrievalQAChain } = require('langchain/chains')
// const { ChatOpenAI } = require('langchain/chat_models/openai')
// const { ConversationSummaryMemory } = require('langchain/memory')
const { PromptTemplate } = require('langchain/prompts')

const { VectorStoreToolkit, createVectorStoreAgent, VectorStoreInfo } = require('langchain/agents')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')

const dotenv = require('dotenv')
dotenv.config()

const LLM_MODEL = 'gpt-3.5-turbo-16k'

// let gChatHistory = ``

module.exports = {
	query,
}

// async function query(prompt, sessionData) {
// 	try {
// 		const promptFromTemplate = getPromptTemplate()
// 		const formattedPrompt = await promptFromTemplate.format({
// 			chat_history: JSON.stringify(sessionData.chatHistory),
// 			input: prompt,
// 		})
// 		const chain = await getConversationalRetrievalChain(sessionData.boardId)
// 		const response = await chain.call({
// 			question: formattedPrompt,
// 			chat_history: JSON.stringify(sessionData.chatHistory),
// 		})
// 		// console.log({
// 		// 	output: response.text,
// 		// 	sourceDocuments: response.sourceDocuments,
// 		// })
// 		if (!response?.text) throw new Error('No response text')
// 		return response
// 	} catch (error) {
// 		console.error('An error occurred while querying:', error)
// 		throw error
// 	}
// }

// async function getConversationalRetrievalChain(boardId) {
// 	try {
// 		const vectorStore = await dbService.getVectorStore(boardId)
// 		return ConversationalRetrievalQAChain.fromLLM(
// 			new ChatOpenAI({
// 				modelName: LLM_MODEL,
// 				temperature: 0,
// 			}),
// 			vectorStore.asRetriever(),
// 			{
// 				// k: 4,
// 				returnSourceDocuments: true,
// 			}
// 		)
// 	} catch (error) {
// 		console.error('An error occurred while getting conversational retrieval chain:', error)
// 		throw error
// 	}
// }

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

async function getAgent(boardId) {
	try {
		const vectorStore = await dbService.getVectorStore(boardId)
		const model = new OpenAI({
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
		console.error('An error occurred while getting conversational retrieval chain:', error)
		throw error
	}
}

async function query(prompt, sessionData) {
	try {
		const promptFromTemplate = getPromptTemplate()
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: gChatHistory,
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
