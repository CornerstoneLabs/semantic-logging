describe("WebLogger", function () {
        var path = require("path");
        console.log("CWD: ", path.resolve('.'));
        var lib = path.resolve('./lib');
        console.log('SRC', lib);

        require('register-module')({
                name: 'lib',
                path: lib,
                main: 'index.js'
        });

	var webLogger = require("lib/webLogger.js");
	var assert = require("assert");

	var adapterMock = {
		log: function () {
		}
	};

	it("should create a default adapter ready to be overridden", function () {
		new webLogger.WebLogger().info("test");

		assert.notEqual(typeof webLogger.getAdapter(), undefined);
		assert.notEqual(typeof webLogger.getAdapter().log, undefined);
		assert.equal(typeof webLogger.getAdapter().log, "function");
	});

	it("should create a new WebLogger", function () {
		webLogger.initialise(adapterMock);

		var newLogger = new webLogger.WebLogger();

		assert.notEqual(typeof newLogger, undefined);
	});

	it("should not overwrite the adapter", function () {
		assert.equal(webLogger.getAdapter(), adapterMock);
	});

	describe("constructor", function () {
		it("Should attach headers.request-id if it exists ", function () {
			var request = {
				headers: {
					"request-id": "123412312312312312312312"
				}
			};

			var newLogger = new webLogger.WebLogger(request);

			assert.equal(newLogger.requestId, request.headers["request-id"]);
		});
	});

	describe("debug", function () {
		it("should write to _adapter.log with the functionName", function () {
			var newLogger = new webLogger.WebLogger();

			var checkLevel;
			var checkFunctionName;

			webLogger.getAdapter().log = function (level, functionName) {
				checkLevel = level;
				checkFunctionName = functionName;
			};

			newLogger.debug("testing debug");

			assert.equal(checkLevel, "debug");
			assert.equal(checkFunctionName, "testing debug");
		});
	});

	describe("verbose", function () {
		it("should write to _adapter.log with the functionName", function () {
			var newLogger = new webLogger.WebLogger();

			var checkLevel;
			var checkFunctionName;

			webLogger.getAdapter().log = function (level, functionName) {
				checkLevel = level;
				checkFunctionName = functionName;
			};

			newLogger.verbose("testing verbose");

			assert.equal(checkLevel, "verbose");
			assert.equal(checkFunctionName, "testing verbose");
		});
	});

	describe("info", function () {
		it("should write to _adapter.log with the functionName", function () {
			var newLogger = new webLogger.WebLogger();

			var checkLevel;
			var checkFunctionName;

			webLogger.getAdapter().log = function (level, functionName) {
				checkLevel = level;
				checkFunctionName = functionName;
			};

			newLogger.info("testing info");

			assert.equal(checkLevel, "info");
			assert.equal(checkFunctionName, '{"latency":0,"message":"testing info"}');
		});
	});

	describe("warn", function () {
		it("should write to _adapter.log with the functionName", function () {
			var newLogger = new webLogger.WebLogger();

			var checkLevel;
			var checkFunctionName;

			webLogger.getAdapter().log = function (level, functionName) {
				checkLevel = level;
				checkFunctionName = functionName;
			};

			newLogger.warn("testing warn");

			assert.equal(checkLevel, "warn");
			assert.equal(checkFunctionName, "testing warn");
		});
	});

	describe("error", function () {
		it("should write to _adapter.log with the functionName", function () {
			var newLogger = new webLogger.WebLogger();

			var checkLevel;
			var checkFunctionName;

			webLogger.getAdapter().log = function (level, functionName) {
				checkLevel = level;
				checkFunctionName = functionName;
			};

			newLogger.error("testing error");

			assert.equal(checkLevel, "error");
			assert.equal(checkFunctionName, "testing error");
		});
	});
});
