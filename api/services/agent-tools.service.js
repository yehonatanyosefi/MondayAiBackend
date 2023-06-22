const agentToolsClassService = require('./agent-tools-class.service')

function VectorTool(namespace) {
	const VectorTool = new agentToolsClassService.VectorToolClass(namespace)
	VectorTool.returnDirect = true
	return VectorTool
}

module.exports = {
	VectorTool,
}
