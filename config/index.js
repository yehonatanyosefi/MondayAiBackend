var config

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
} else {
  // config = require('./dev')
  config = require('./prod')
}
config.isGuestMode = true

module.exports = config
