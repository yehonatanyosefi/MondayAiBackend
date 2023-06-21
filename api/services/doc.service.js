const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
const { CharacterTextSplitter } = require('langchain/text_splitter')
const { Document } = require('langchain/document')
const dotenv = require('dotenv')
dotenv.config()

async function getReduceDocs(docs) {
	try {
		const chunks = await splitToChunks(docs)
		const reducedChunks = reduceChunks(chunks)
		return reducedChunks
	} catch (err) {
		console.error(err)
		throw err
	}
}

async function getReducedText(text) {
	const splitter = new CharacterTextSplitter({
		separator: ' ',
		chunkSize: 1000,
		chunkOverlap: 100,
	})
	const docs = await splitter.createDocuments([text])
	return docs
}

async function splitToChunks(docs) {
	const splitterOptions = {
		separator: ' ',
		chunkSize: 1000,
		chunkOverlap: 100,
	}
	const splitter = new CharacterTextSplitter(splitterOptions)
	const chunks = await splitter.splitDocuments(docs)
	return chunks
}

function reduceChunks(chunks) {
	const reducedDocs = chunks.map((chunk) => {
		const reducedMetadata = { ...chunk.metadata }
		delete reducedMetadata.pdf
		return new Document({
			pageContent: chunk.pageContent,
			metadata: reducedMetadata,
		})
	})
	return reducedDocs
}

// async function loadDocs(path) {
// 	const loader = new PDFLoader(path)
// 	const docs = await loader.load()
// 	if (!docs) {
// 		throw new Error('No documents found.')
// 	}
// 	return docs
// }

module.exports = {
	getReduceDocs,
	getReducedText,
}
