const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, "public")))
} else {
	const corsOptions = {
		origin: ['https://3fb7-82-166-194-193.ngrok-free.app', 'http://localhost:5173', "https://board-assistant-production.up.railway.app/"],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

const aiRoutes = require('./api/ai/ai.routes')

app.use('/ai', aiRoutes)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
	logger.info('Server is running on port: ' + port)
})
