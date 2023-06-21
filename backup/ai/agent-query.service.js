const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { PineconeClient } = require('@pinecone-database/pinecone')
const { OpenAI } = require('langchain/llms/openai')
const { VectorDBQAChain } = require('langchain/chains')
const { PromptTemplate } = require('langchain/prompts')
const dotenv = require('dotenv')
dotenv.config()

export default async function handler(req, res) {
	try {
		// do stuff
		const { prompt } = req.body

		/** Load vector database */
		const client = new PineconeClient()
		await client.init({
			apiKey: process.env.PINECONE_API_KEY,
			environment: process.env.PINECONE_ENVIRONMENT,
		})

		const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

		const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), { pineconeIndex })

		// Create Vector DBQA CHain
		const model = new OpenAI()
		const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
			k: 1,
			returnSourceDocuments: true,
		})

		// Prompt Template
		const promptTemplate = new PromptTemplate({
			template: `Assume you are a Human Resources Director. According to the resumes, answer this question: {question}`,
			inputVariables: ['question'],
		})

		const formattedPrompt = await promptTemplate.format({
			question: prompt,
		})

		const response = await chain.call({
			query: formattedPrompt,
		})

		console.log({ response })

		return res.status(200).json({
			// String
			output: response.text,
			//   [Document, Document]
			sourceDocuments: response.sourceDocuments,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Error' })
	}
}
