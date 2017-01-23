describe("SemanticLogger", () => {
	var path = require("path");
	console.log("CWD: ", path.resolve('.'));
	var src = path.resolve('./src');
	console.log('SRC', src);

	require('register-module')({
		name: 'src',
		path: src,
		main: 'index.js'
	});	

	var webLogger = require("src/webLogger");
	var baseLogger = require("src/semanticLogger");
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
