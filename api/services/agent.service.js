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
	const llm = new ChatOpenAI({
	temperature: 0.7,
	modelName: 'gpt-3.5-turbo',
})

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
	SystemMessagePromptTemplate.fromTemplate(
		'You are a helpful social media assistant that provides research, new content, and advice to me. \n You are given the transcript of the video: {transcript} \n and video metadata: {metadata} as well as additional research: {research}'
	),
	HumanMessagePromptTemplate.fromTemplate(
		'{input}. Remember to use the video transcript and research as reference.'
	),
])

const question = `Write me a script for a new video that provides commentary on this video in a lighthearted, joking manner. It should compliment ${topic} with puns.`

chain = new LLMChain({
	prompt: chatPrompt,
	llm: llm,
})
let response

try {
	response = await chain.call({
		transcript,
		metadata: metadataString,
		research,
		input: question,
	})
} catch (error) {
	console.error(`An error occurred during the call to chain: ${error.message}`)
	response = { text: '' } // Provide an empty response or a default value
}
}