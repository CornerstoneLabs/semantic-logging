var semanticLogger = require("./semanticLogger.js");
var webLogger = require("./webLogger.js");

module.exports = {
	initialise: webLogger.initialise,
	getAdapter: webLogger.getAdapter,
	WebLogger: webLogger.WebLogger,
	SemanticLogger: semanticLogger.SemanticLogger,
	debug: semanticLogger.debug,
	verbose: semanticLogger.verbose,
	info: semanticLogger.info,
	warn: semanticLogger.warn,
	error: semanticLogger.error,
	WinstonAdapter: require("./WinstonAdapter.js")
};
