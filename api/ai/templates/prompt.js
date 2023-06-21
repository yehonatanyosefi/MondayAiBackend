require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function promptGpt(prompt, temperature = 0) {
	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
			temperature,
		})
		const response = completion.data.choices[0].message.content
		return response
	} catch (error) {
		console.error(`Error in promptGpt function: ${error.message}`)
		throw error
	}
}

async function askGpt(formattedPrompt) {
	try {
		const content = await promptGpt(formattedPrompt)
		if (!content) {
			throw new Error('Failed to get content from GPT')
		}
		const aiRegex = /sorry, as an ai language model/i
		const isInvalid = aiRegex.test(content)
		if (isInvalid) {
			throw new Error('Invalid answer')
		}
		return content
	} catch (error) {
		console.error(`Error in gpt function: ${error.message}`)
		throw new Error(error)
	}
}

function formatForGpt(prompt, qualifiers, format, userContent) {
	const formattedPrompt = `${prompt}
${qualifiers}
The final format should be exactly as follows: ${format}
\`\`\`${userContent}\`\`\``
	return formattedPrompt
}

const parseCode = `Please only include ? in your response, as I will be parsing them using code.`
const htmlResponse = `Format everything as HTML that can be used in a website. Place the ? in a <div> element.`
const jsonResponse = `Format everything as a JSON object with ? and ? as the keys. So it will be easily parsed using code.`
const csvResponse = `Format everything as a CSV file so it will be parsed easily using code.`

const maxWords = `Use at most 50 words.`
async function useGpt() {
	try {
		const prompt = `Please provide ? delimited by the triple backticks.`
		const qualifiers = `Make sure each ? is unique.`
		const format = `<>`

		const formattedPrompt = formatForGpt(prompt, qualifiers, format, userContent)
		const temperature = 0.5
		const response = await askGpt(formattedPrompt, temperature)
		return response
	} catch (err) {
		console.error('Error in using gpt:', err)
		throw err
	}
}
// async function useGpt() {
//      try {
// 		const prompt = `Please provide ? delimited by the triple backticks.`
// 		const qualifiers = `Make sure each ? is unique.`
// 		const format = `<>`

// 		const formattedPrompt = formatForGpt(prompt, qualifiers, format, userContent)
//           const response = await askGpt(formattedPrompt)
//           return response
//      } catch (err) {
//           console.error('Error in using gpt:',err)
//           throw err
//      }
// }
