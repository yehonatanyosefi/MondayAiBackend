require('dotenv').config()
module.exports = {
  dbURL: process.env.ATLAS_URL,
  dbName: process.env.ATLAS_DB_NAME,
  apiKey: process.env.OPENAI_API_KEY
}