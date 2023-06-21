const { serpAPI } = require('langchain/tools')
const { WebBrowser } = require('langchain/tools/webbrowser')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const dbService = require('./db.service')
const dotenv = require('dotenv')
dotenv.config()

export const agentToolsService = {
	SerpAPITool,
	WebBrowserTool,
}

function SerpAPITool() {
	const serpAPI = new SerpAPI(process.env.SERPAPI_API_KEY, {
		location: 'Israel',
		hl: 'en',
		gl: 'us',
	})
	serpAPI.returnDirect = true

	return serpAPI
}

function WebBrowserTool() {
	const model = new ChatOpenAI({ temperature: 0 })
	const embeddings = dbService.EMBEDDING

	const browser = new WebBrowser({ model, embeddings })
	browser.returnDirect = true

	return browser
}
