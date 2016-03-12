describe("SemanticLogger", () => {
	var webLogger = require("../../lib/WebLogger.js");
	var baseLogger = require("../../lib/SemanticLogger.js");
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
