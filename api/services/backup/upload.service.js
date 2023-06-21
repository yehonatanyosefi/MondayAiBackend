const { DirectoryLoader } = require('langchain/document_loaders/fs/directory')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
const { CharacterTextSplitter } = require('langchain/text_splitter')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { PineconeClient } = require('@pinecone-database/pinecone')
const { loadSummarizationChain } = require('langchain/chains')
const { OpenAI } = require('langchain/llms/openai')
const dotenv = require('dotenv')
dotenv.config()

export default async function handler(req, res) {
	try {
		const splitter = new CharacterTextSplitter({
			separator: ' ',
			chunkSize: 200,
			chunkOverlap: 20,
		})

		const splitDocs = await splitter.splitDocuments(docs)

		// reduce the metadata and make it more searchable
		const reducedDocs = splitDocs.map((doc) => {
			// ["Users", "shawnesquivel", ... "resume_aubrey_graham.pdf"]
			const fileName = doc.metadata.source.split('/').pop()
			// ["resume", "aubrey", "graham.pdf"]
			const [_, firstName, lastName] = fileName.split('_')

			return {
				...doc,
				metadata: {
					first_name: firstName,
					last_name: lastName.slice(0, -4),
					docType: 'resume',
				},
			}
		})

		let summaries = []
		const model = new OpenAI({ temperature: 0 })
		const summarizeAllChain = loadSummarizationChain(model, {
			type: 'map_reduce',
		})

		// raw documents
		const summarizeRes = await summarizeAllChain.call({
			input_documents: reducedDocs,
		})
		summaries.push({ summary: summarizeRes.text })

		/** Summarize each candidate */
		for (let doc of reducedDocs) {
			const summarizeOneChain = loadSummarizationChain(model, {
				type: 'map_reduce',
			})
			const summarizeOneRes = await summarizeOneChain.call({
				input_documents: [doc],
			})
			summaries.push({ summary: summarizeOneRes.text })
		}

		/** Upload the reducedDocs */
		const client = new PineconeClient()
		await client.init({
			apiKey: process.env.PINECONE_API_KEY,
			environment: process.env.PINECONE_ENVIRONMENT,
		})

		const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

		await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
			pineconeIndex,
		})

		const summaryStr = JSON.stringify(summaries, null, 2)

		return res.status(200).json({ output: summaryStr })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: err })
	}
}
