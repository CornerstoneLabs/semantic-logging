describe("SemanticLogger", () => {
	var webLogger = require("../../src/webLogger.js");
	var baseLogger = require("../../src/semanticLogger.js");
	var info = baseLogger.info;
	var debug = baseLogger.debug;
	var warn = baseLogger.warn;
	var verbose = baseLogger.verbose;
	var error = baseLogger.error;

	describe("decorators debug", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@debug
				testThisDebug () {};

				@warn
				testThisWarn () {};

				@verbose
				testThisVerbose () {};

				@error
				testThisError () {};

				@info
				testThisInfo () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("debug", () => {
			it("should add an debug function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisDebug).toBeDefined();
				expect(loggerInstance.testThisWarn).toBeDefined();
				expect(loggerInstance.testThisVerbose).toBeDefined();
				expect(loggerInstance.testThisError).toBeDefined();
				expect(loggerInstance.testThisInfo).toBeDefined();

				expect(typeof loggerInstance.testThisDebug).toBe("function");

				loggerInstance.testThisDebug();
			});
		});
	});

	describe("decorators info", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@info
				testThisDebug () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("info", () => {
			it("should add an info function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisDebug).toBeDefined();

				expect(typeof loggerInstance.testThisDebug).toBe("function");

				loggerInstance.testThisDebug();
			});
		});
	});

	describe("decorators warn", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@warn
				testThisWarn () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("warn", () => {
			it("should add an warn function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisWarn).toBeDefined();

				expect(typeof loggerInstance.testThisWarn).toBe("function");

				loggerInstance.testThisWarn();

				expect(checkLevel).toBe("warn");
				expect(checkFunctionName).toBe("testThisWarn");
			});
		});
	});

	describe("decorators verbose", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@verbose
				testThisVerbose () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("verbose", () => {
			it("should add an verbose function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisVerbose).toBeDefined();

				expect(typeof loggerInstance.testThisVerbose).toBe("function");

				loggerInstance.testThisVerbose();

				expect(checkLevel).toBe("verbose");
				expect(checkFunctionName).toBe("testThisVerbose");
			});
		});
	});

	describe("decorators error", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@error
				testThisError () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("error", () => {
			it("should add an error function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisError).toBeDefined();

				expect(typeof loggerInstance.testThisError).toBe("function");

				loggerInstance.testThisError();

				expect(checkLevel).toBe("error");
				expect(checkFunctionName).toBe("testThisError");
			});

			it("should log additional error data", () => {
				var checkLevel;
				var checkFunctionName;
				var checkMeta;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName, meta) => {
					checkLevel = level;
					checkFunctionName = functionName;
					checkMeta = meta;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisError).toBeDefined();

				expect(typeof loggerInstance.testThisError).toBe("function");

				loggerInstance.testThisError("bad error");

				expect(checkLevel).toBe("error");
				expect(checkFunctionName).toBe("testThisError");
				expect(checkMeta.details).toBe("bad error" );
			});
		});
	});

	describe("decorators info", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@info
				testThisInfo () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("info", () => {
			it("should add an info function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisInfo).toBeDefined();

				expect(typeof loggerInstance.testThisInfo).toBe("function");

				loggerInstance.testThisInfo();

				expect(checkLevel).toBe("info");
				expect(checkFunctionName).toBe("testThisInfo");
			});

			it("should log additional info data", () => {
				var checkLevel;
				var checkFunctionName;
				var checkMeta;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName, meta) => {
					checkLevel = level;
					checkFunctionName = functionName;
					checkMeta = meta;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisInfo).toBeDefined();

				expect(typeof loggerInstance.testThisInfo).toBe("function");

				loggerInstance.testThisInfo("info 0", "info 1");

				expect(checkLevel).toBe("info");
				expect(checkFunctionName).toBe("testThisInfo");
				expect(checkMeta[0]).toBe("info 0" );
				expect(checkMeta[1]).toBe("info 1" );
			});
		});
	});

	describe("decorators debug", () => {
		var TestLogger;

		beforeEach(() => {
			class TestLoggerDefinition extends baseLogger.SemanticLogger {
				constructor (request) {
					super(request);
				}

				@debug
				testThisDebug () {};
			}

			TestLogger = TestLoggerDefinition;
		});

		describe("debug", () => {
			it("should add an debug function", () => {
				var checkLevel;
				var checkFunctionName;

				// we're going to check the output
				webLogger.getAdapter().log = (level, functionName) => {
					checkLevel = level;
					checkFunctionName = functionName;
				};

				var loggerInstance = new TestLogger({});

				expect(loggerInstance).toBeDefined();

				expect(loggerInstance.testThisDebug).toBeDefined();

				expect(typeof loggerInstance.testThisDebug).toBe("function");

				loggerInstance.testThisDebug();

				expect(checkLevel).toBe("debug");
				expect(checkFunctionName).toBe("testThisDebug");
			});
		});
	});
});
