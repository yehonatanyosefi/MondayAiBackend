const dbService = require('./db.service')

const { Tool } = require('langchain/tools')
const { OpenAI } = require('langchain/llms/openai')
const { BaseChain } = require('langchain/chains/base.chain')

const TOOL_NAME = 'monday-board-tool'
const TOOL_DESCRIPTION = 'This tool answer questions about the monday board the use has.'
const MODEL_NAME = 'gpt-3.5-turbo-16k-0613'

module.exports = {
	VectorTool,
}

class VectorTool extends Tool {
	name = TOOL_NAME

	description = TOOL_DESCRIPTION

	async _call(arg) {
		try {
			// Perform your custom tool logic here with the input text
			const chain = await new VectorChain().call(arg)
			// and return the output text
			return `Response: ${chain.res}`
		} catch (err) {
			// Handle any errors that occur during the processing
			return `Error occurred: ${err.message}`
		}
	}
}

class VectorChain extends BaseChain {
	_chainType() {
		throw new Error('Method not implemented.')
	}
	serialize() {
		throw new Error('Method not implemented.')
	}
	inputKeys = ['data']
	outputKeys = ['res']

	async _call(inputs, namespace) {
		const vectorStore = await dbService.getVectorStore(namespace)

		const model = new OpenAI({
			temperature: 0,
			modelName: MODEL_NAME,
			verbose: false,
			openAIApiKey: process.env.OPENAI_API_KEY,
		})
		// console.log(inputs)

		let sanitizedQuestion = ''
		for (const key in inputs) {
			sanitizedQuestion += inputs[key]
		}

		const retrievedContext = await vectorStore.similaritySearch(sanitizedQuestion, 4)

		let context = ''

		retrievedContext.forEach((document) => {
			context += document['pageContent']
		})

		let QA_PROMPT = `Background information is below. 
      ---------------------
      ${context}
      ---------------------
      Given background information, not prior knowledge, answer the following question : ${sanitizedQuestion} ?:
      
      `

		const res = await model.call(QA_PROMPT)

		return { res }
	}
}
