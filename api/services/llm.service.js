const dbService = require('./db.service')
const { ConversationalRetrievalQAChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const { ConversationSummaryMemory } = require('langchain/memory')
const { PromptTemplate } = require('langchain/prompts')
const dotenv = require('dotenv')
dotenv.config()

const LLM_MODEL = 'gpt-3.5-turbo'

let gChatHistory = ``

module.exports = {
	query,
	initializeVars,
}

async function query(prompt) {
	try {
		const promptFromTemplate = getPromptTemplate()
		const formattedPrompt = await promptFromTemplate.format({
			chat_history: gChatHistory,
			input: prompt,
		})
		const chain = await getConversationalRetrievalChain()
		const response = await chain.call({ question: formattedPrompt, chat_history: gChatHistory })
		// console.log({
		// 	output: response.text,
		// 	sourceDocuments: response.sourceDocuments,
		// })
		if (!response?.text) throw new Error('No response text')
		gChatHistory += `Human:${prompt}\n`
		gChatHistory += `AI:${response.text}\n`
		return response
	} catch (error) {
		console.error('An error occurred while querying:', error)
		throw error
	}
}

async function getConversationalRetrievalChain() {
	try {
		const vectorStore = await dbService.getVectorStore()
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
