const toolService = require('./agent-tools.service')

const { ChatOpenAI } = require('langchain/chat_models/openai')
const { LLMChain } = require('langchain/chains')
const { ZeroShotAgent } = require('langchain/agents')
const {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
} = require('langchain/prompts')
const { AgentExecutor } = require('langchain/agents')

module.exports = {
	queryAgent,
}

// async function queryAgent(prompt, sessionData) {
// 	try {
// 		const VectorTool = new toolService.VectorTool(sessionData.namespace)
// 		const tools = []

// 		const promptTemplate = ZeroShotAgent.createPrompt(tools, {
// 			prefix: `Answer the following questions as best you can. Whilst doing so, act as an """Monday.com Board Ai Assistant""". You have access to the following tools:`,
// 			suffix: `Begin! Answer concisely. It's OK to say you don't know.`,
// 		})

// 		const chatPrompt = ChatPromptTemplate.fromPromptMessages([
// 			new SystemMessagePromptTemplate(promptTemplate),
// 			HumanMessagePromptTemplate.fromTemplate(`{input}`),
// 		])

// 		const chat = new ChatOpenAI({})
// 		const llmChain = new LLMChain({
// 			prompt: chatPrompt,
// 			llm: chat,
// 		})

// 		const agent = new ZeroShotAgent({
// 			llmChain,
// 			allowedTools: tools.map((tool) => tool.name),
// 		})

// 		const executor = AgentExecutor.fromAgentAndTools({
// 			agent,
// 			tools,
// 			returnIntermediateSteps: false,
// 			maxIterations: 3,
// 			// verbose: true,
// 		})

// 		const result = await executor.run(prompt)
// 		console.log(`result:`, result)

// 		// return result
// 	} catch (err) {
// 		console.error(err)
// 		return 'Error in completing research'
// 	}
// }

async function queryAgent(prompt, sessionData) {
	const research = await researchAgent('research about pokemon')
	console.log(research)

	const response = await initChain(prompt)
	return response
}
async function initChain(prompt) {
	const llm = new ChatOpenAI({
		temperature: 0.7,
		modelName: 'gpt-3.5-turbo',
	})

	const chatPrompt = ChatPromptTemplate.fromPromptMessages([
		SystemMessagePromptTemplate.fromTemplate(
			'You are a helpful social media assistant that provides research, new content, and advice to me. \n You are given the context of the board {context}.'
		),
		HumanMessagePromptTemplate.fromTemplate(
			'{input}. Remember to use the video transcript and research as reference.'
		),
	])

	chain = new LLMChain({
		prompt: chatPrompt,
		llm: llm,
	})
	let response

	try {
		response = await chain.call({
			context: 'none atm',
			input: prompt,
		})
	} catch (error) {
		console.error(`An error occurred during the call to chain: ${error.message}`)
		response = { text: '' } // Provide an empty response or a default value
	}
	return response
}
searchAgent(prompt) {
	try {
		const tools = [SerpAPI, WebBrowser]

		const promptTemplate = ZeroShotAgent.createPrompt(tools, {
			prefix: `Answer the following questions as best you can. You have access to the following tools:`,
			suffix: `Begin! Answer concisely. It's OK to say you don't know.`,
		})

		// Then we'll initialize it with a Prompt template again
		const chatPrompt = ChatPromptTemplate.fromPromptMessages([
			new SystemMessagePromptTemplate(promptTemplate),
			HumanMessagePromptTemplate.fromTemplate(`{input}`),
		])

		// And we'll initialize the model, what is chatOpenAI since we're using a ChatAgent
		const chat = new ChatOpenAI({})
		// We'll create an LLM chain which just a prompt  template and a LLM or chat model
		const llmChain = new LLMChain({
			prompt: chatPrompt,
			llm: chat,
		})
		// then we'lll use that LLM chain as the basis of the agent
		// so basidcally our agent is made up of: Tools, LLM and Prompt Templates, making it highly customizable to our needs!
		const agent = new ZeroShotAgent({
			llmChain,
			allowedTools: tools.map((tool) => tool.name),
		})
		// Now we'll create an Executor instance which allows us to make queries to the agent

		const executor = AgentExecutor.fromAgentAndTools({
			agent,
			tools,
			returnIntermediateSteps: false,
			maxIterations: 3,
			verbose: true,
		})

		const result = await executor.run(`Who is ${topic}?`)

		return result
	} catch (err) {
		console.error(err)
		return 'Error in completing research'
	}
}
