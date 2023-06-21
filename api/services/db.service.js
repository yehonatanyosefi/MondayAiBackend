const { PineconeClient } = require('@pinecone-database/pinecone')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { VectorOperationsApi } = require('@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch')
const dotenv = require('dotenv')
dotenv.config()

const EMBEDDING = new OpenAIEmbeddings()
let gClientIndex = null
let gPineconeArgs = null

async function uploadToPinecone(inputs, boardId) {
	console.log("file: db.service.js:17 -> uploadToPinecone -> boardId:", boardId)
	try {
		if (!gClientIndex) await _initClient(boardId)
		uploadTexts([inputs])
		// if (typeof inputs[0] === 'string') {
		// 	await uploadTexts(inputs)
		// 	return
		// }
		// await uploadDocs(inputs)
		return
	} catch (err) {
		console.log('Error Uploading to Pinecone', err)
		throw err
	}
}

async function uploadDocs(docs) {
	await PineconeStore.fromDocuments(docs, EMBEDDING, gPineconeArgs)
}

async function uploadTexts(texts) {
	await PineconeStore.fromTexts(texts, [], EMBEDDING, gPineconeArgs)
}

async function getVectorStore() {
	if (!gClientIndex) await _initClient()
	const vectorStore = await PineconeStore.fromExistingIndex(EMBEDDING, gPineconeArgs)
	return vectorStore
}

async function _initClient(boardId) {
	try {
		if (gClientIndex) return
		const client = new PineconeClient()

		if (!process.env.PINECONE_ENVIRONMENT_REGION || !process.env.PINECONE_API_KEY) {
			throw new Error('Pinecone environment or api key vars missing')
		}
		await client.init({
			apiKey: process.env.PINECONE_API_KEY,
			environment: process.env.PINECONE_ENVIRONMENT_REGION,
		})
		const clientIndex = client.Index(process.env.PINECONE_INDEX)
		gClientIndex = clientIndex
		gPineconeArgs = {
			pineconeIndex: gClientIndex,
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
