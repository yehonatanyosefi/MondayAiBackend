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
		origin: ['https://5b29-2a00-a040-192-6987-787a-b331-bb66-a947.ngrok-free.app', 'http://localhost:5173'],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

const aiRoutes = require('./api/ai/ai.routes')

app.use('/ai', aiRoutes)
app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
	logger.info('Server is running on port: ' + port)
})
