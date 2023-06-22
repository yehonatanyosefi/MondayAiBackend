const toolService = require('./agent-tools.service')

const {ChatOpenAI} = require('langchain/chat_models/openai')
const {LLMChain} = require('langchain/chains')
const {ZeroShotAgent} = require('langchain/agents')
const {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} = require('langchain/prompts')
const {AgentExecutor} = require('langchain/agents')

modeule.exports = {
     agent,
}

function agent(prompt) {
     try {
    const VectorTool = toolService.VectorTool();
    const tools = [VectorTool];

    const promptTemplate = ZeroShotAgent.createPrompt(tools, {
      prefix: `Answer the following questions as best you can. Whilst doing so, act as an """Monday.com Board Ai Assistant""". You have access to the following tools:`,
      suffix: `Begin! Answer concisely. It's OK to say you don't know.`,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      new SystemMessagePromptTemplate(promptTemplate),
      HumanMessagePromptTemplate.fromTemplate(`{input}`),
    ]);

    const chat = new ChatOpenAI({});
    const llmChain = new LLMChain({
      prompt: chatPrompt,
      llm: chat,
    });
    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: tools.map((tool) => tool.name),
    });

    const executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      returnIntermediateSteps: false,
      maxIterations: 3,
      verbose: true,
    });

    const result = await executor.run(`Who is ${prompt}?`);

    return result;
  } catch (err) {
    console.error(err);
    return "Error in completing research";
  }
}