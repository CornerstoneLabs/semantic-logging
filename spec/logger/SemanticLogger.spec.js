describe("SemanticLogger", () => {
	var path = require("path");
	console.log("CWD: ", path.resolve('.'));

	var webLogger = require("./src/webLogger.js");
	var baseLogger = require("./src/semanticLogger.js");
	var info = baseLogger.info;
	var debug = baseLogger.debug;
	var warn = baseLogger.warn;
	var verbose = baseLogger.verbose;
	var error = baseLogger.error;

	describe("constructor", () => {
		it("should attach the request to the instance", () => {
			var request = {};

			var testLogger = new baseLogger.SemanticLogger(request);

			expect(testLogger.request).toBe(request);
		});
	});
});
