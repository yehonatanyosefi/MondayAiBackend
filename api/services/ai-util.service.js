module.exports = {
	truncateChatHistory,
}

function truncateChatHistory(chatHistory, maxWords = 2000) {
	let wordCount = 0
	const truncatedHistory = []

	for (let i = chatHistory.length - 1; i >= 0; i--) {
		const words = getWordsFromMessage(chatHistory[i])

		if (wordCount + words.length <= maxWords) {
			truncatedHistory.push(chatHistory[i])
			wordCount += words.length
		} else {
			wordCount = addPartialMessageToHistory(truncatedHistory, words, wordCount, maxWords)
			break
		}
	}

	return JSON.stringify(truncatedHistory.reverse())
}

function addPartialMessageToHistory(truncatedHistory, words, wordCount, maxWords) {
	// Add as many words as possible from the message
	for (let word of words) {
		if (wordCount + 1 <= maxWords) {
			truncatedHistory[truncatedHistory.length - 1].text += ` ${word}`
			wordCount += 1
		} else {
			break
		}
	}
	return wordCount
}

function getWordsFromMessage(message) {
	const text = message['Human'] || message['AI']
	const wordsEquivalent = Math.floor(text.length / 5)
	return new Array(wordsEquivalent).fill('')
}
