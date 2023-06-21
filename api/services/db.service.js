const { PineconeClient } = require('@pinecone-database/pinecone')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
// const { VectorOperationsApi } = require('@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch')
const dotenv = require('dotenv')
dotenv.config()

const EMBEDDING = new OpenAIEmbeddings()

async function uploadToPinecone(inputs, namespace) {
	try {
		await _initClient(namespace)
		if (typeof inputs[0] === 'string') {
			await uploadTexts(inputs, boardId)
			return
		}
		await uploadDocs(inputs, boardId)
	} catch (err) {
		console.log('Error Uploading to Pinecone', err)
		throw err
	}
}

async function uploadDocs(docs, namespace) {
	const pineconeArgs = await _getPineconeArgs(namespace)
	await PineconeStore.fromDocuments(docs, EMBEDDING, pineconeArgs)
}

async function uploadTexts(texts, namespace) {
	const pineconeArgs = await _getPineconeArgs(namespace)
	await PineconeStore.fromTexts(texts, [], EMBEDDING, pineconeArgs)
}

async function getVectorStore(namespace) {
	const pineconeArgs = await _getPineconeArgs(namespace)
	const vectorStore = await PineconeStore.fromExistingIndex(EMBEDDING, pineconeArgs)
	return vectorStore
}

async function _getPineconeArgs(namespace) {
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
			namespace: namespace.toString(),
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
