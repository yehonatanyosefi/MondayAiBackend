const { PineconeClient } = require('@pinecone-database/pinecone')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { VectorOperationsApi } = require('@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch')
const dotenv = require('dotenv')
dotenv.config()

const EMBEDDING = new OpenAIEmbeddings()

async function uploadToPinecone(inputs, boardId) {
	try {
		await _initClient(boardId)
		await uploadTexts([inputs], boardId)
		// if (typeof inputs[0] === 'string') {
		// 	await uploadTexts([inputs], boardId)
		// 	return
		// }
		// await uploadDocs([inputs], boardId)
	} catch (err) {
		console.log('Error Uploading to Pinecone', err)
		throw err
	}
}

async function uploadDocs(docs, boardId) {
	const pineconeArgs = await _getPineconeArgs(boardId)
	await PineconeStore.fromDocuments(docs, EMBEDDING, pineconeArgs)
}

async function uploadTexts(texts, boardId) {
	const pineconeArgs = await _getPineconeArgs(boardId)
	await PineconeStore.fromTexts(texts, [], EMBEDDING, pineconeArgs)
}

async function getVectorStore(boardId) {
	const pineconeArgs = await _getPineconeArgs(boardId)
	const vectorStore = await PineconeStore.fromExistingIndex(EMBEDDING, pineconeArgs)
	return vectorStore
}

async function _getPineconeArgs(boardId) {
	try {
		if (!process.env.PINECONE_ENVIRONMENT_REGION || !process.env.PINECONE_API_KEY) {
			throw new Error('Pinecone environment or api key vars missing')
		}

		const client = new PineconeClient()

		await client.init({
			apiKey: process.env.PINECONE_API_KEY,
			environment: process.env.PINECONE_ENVIRONMENT_REGION,
		})

		const clientIndex = client.Index(process.env.PINECONE_INDEX)

		return {
			pineconeIndex: clientIndex,
			namespace: boardId.toString(),
		}
	} catch (err) {
		console.error('Failed to initialize Pinecone Client', err)
		throw err
	}
}

module.exports = {
	getVectorStore,
	uploadToPinecone,
	EMBEDDING,
}
