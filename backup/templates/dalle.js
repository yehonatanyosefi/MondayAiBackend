require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function makeWithDallE(prompt) {
	try {
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		})
		const imgUrl = response.data.data[0].url
		return imgUrl
	} catch (err) {
		console.error(`Error making with Dall E: ${err}`)
		throw err
	}
}

function formatForDallE(prompt) {
	const formattedPrompt = `a masterpiece of a photo with the best quality as if from a high quality cinematic movie, ${prompt}`
	return formattedPrompt
}
