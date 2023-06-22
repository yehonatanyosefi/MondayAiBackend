const dbService = require('./db.service')

const { Tool } = require('langchain/tools')
const { OpenAI } = require('langchain/llms/openai')
const { BaseChain } = require('langchain/chains')

const TOOL_NAME = 'monday-board-semantic-answerer'
const TOOL_DESCRIPTION =
	'This tool answer questions about the monday board the user has, useful to get context about monday board.'
const MODEL_NAME = 'gpt-3.5-turbo-16k-0613'

class VectorToolClass extends Tool {
	name = TOOL_NAME

	description = TOOL_DESCRIPTION

	constructor(namespace) {
		super()
		this.namespace = namespace
	}

	async _call(arg) {
		try {
			// Perform your custom tool logic here with the input text
			const chain = await new VectorChain(this.namespace).call(arg)
			// and return the output text
			return `Response: ${chain.res}`
		} catch (err) {
			// Handle any errors that occur during the processing
			return `Error occurred: ${err.message}`
		}
	}
}

class VectorChain extends BaseChain {
	constructor(namespace) {
		super()
		this.namespace = namespace
	}

	_chainType() {
		throw new Error('Method not implemented.')
	}
	serialize() {
		throw new Error('Method not implemented.')
	}
	inputKeys = ['data']
	outputKeys = ['res']

	async _call(inputs) {
		const vectorStore = await dbService.getVectorStore(this.namespace)

		const model = new OpenAI({
			temperature: 0,
			modelName: MODEL_NAME,
			verbose: false,
			openAIApiKey: process.env.OPENAI_API_KEY,
		})

		let sanitizedQuestion = ''
		for (const key in inputs) {
			sanitizedQuestion += inputs[key]
		}

		const retrievedContext = await vectorStore.similaritySearch(sanitizedQuestion, 4)

		let context = ''

		retrievedContext.forEach((document) => {
			context += document['pageContent']
		})

		let QA_PROMPT = `Monday.com board information is below. You are a board AI chatbot. You will only answer as this role.
      ---------------------
      ${context}
      ---------------------
     Given the board in here, Try to answer the question: """${sanitizedQuestion}""".
     Make a summarization of the board if there is no question in the triple quotes.`

		const res = await model.call(QA_PROMPT)

		return { res }
	}
}

module.exports = {
	VectorToolClass,
}
