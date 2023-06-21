const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'public')))
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

const aiRoutes = require('./api/ai/ai.routes')

app.use('/api/ai', aiRoutes)
app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
	logger.info('Server is running on port: ' + port)
})
