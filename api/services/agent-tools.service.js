const dbService = require('./db.service')

const { Tool } = require('langchain/tools')
const { OpenAI } = require('langchain/llms/openai')
const { BaseChain } = require('langchain/chains/base.chain')

const TOOL_NAME = 'monday-board-tool'
const TOOL_DESCRIPTION = 'This tool answer questions about the monday board the use has.'
const MODEL_NAME = 'gpt-3.5-turbo-16k-0613'

export class VectorTool extends Tool {
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

	async _call(inputs) {
		const vectorStore = await dbService.getVectorStore()

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

		var context = ''

		retrievedContext.forEach((document) => {
			context += document['pageContent']
		})

		var QA_PROMPT = `Les informations de contexte sont ci-dessous. 
      ---------------------
      ${context}
      ---------------------
      Compte tenu des informations contextuelles et non des connaissances préalables, répondez à la question suivante : ${sanitizedQuestion} ?:
      
      `

		const res = await model.call(QA_PROMPT)

		return { res }
	}
}
