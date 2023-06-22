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

const LLM_MODEL = 'gpt-3.5-turbo'

module.exports = {
	queryAgent,
}

async function queryAgent(prompt, sessionData) {
	try {
		const VectorTool = toolService.VectorTool(sessionData.namespace)
		const tools = [VectorTool]

		const promptTemplate = ZeroShotAgent.createPrompt(tools, {
			prefix: `Answer the following questions as best you can. You have access to the following tools:`,
			suffix: `Begin! Answer concisely. It's OK to say you don't know.`,
		})

		const chatPrompt = ChatPromptTemplate.fromPromptMessages([
			new SystemMessagePromptTemplate(promptTemplate),
			HumanMessagePromptTemplate.fromTemplate(`{input}`),
		])

		const chat = new ChatOpenAI({
			modelName: LLM_MODEL,
			temperature: 0,
		})
		const llmChain = new LLMChain({
			prompt: chatPrompt,
			llm: chat,
		})
		const agent = new ZeroShotAgent({
			llmChain,
			allowedTools: tools.map((tool) => tool.name),
		})

		const executor = AgentExecutor.fromAgentAndTools({
			agent,
			tools,
			returnIntermediateSteps: false,
			maxIterations: 5,
			verbose: true,
		})

		const result = await executor.run(prompt)

		return result
	} catch (err) {
		console.error(err)
		throw new Error('Error in completing research')
	}
}
