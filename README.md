# Semantic Logging for NodeJS.

Strongly typed logging.

## Current adapters:

* Console

* Winston

## Usage:

Install the library:

    npm install cornerstonelabs-semantic-logging --save

Subclass `SemanticLogger` and add functions for each log message.

Decorate the functions with the log level. The following log levels are supported:
    @debug @verbose @info @warn @error

Example:

    var semanticLogging = require("cornerstonelabs-semantic-logging");

    var debug = semanticLogging.debug;
    var verbose = semanticLogging.verbose;
    var info = semanticLogging.info;
    var warn = semanticLogging.warn;
    var error = semanticLogging.error;

    class DoingSomethingLogging extends semanticLogging.SemanticLogger {
        constructor (request) {
            super (request);
        }

        @info
        initialising () {};

        @info
        started () {};

        @error
        startFailed () {};
    }


    // now let's do some logging:

    function startDoingSomething () {
        var logger = new DoingSomethingLogging();
        logger.initialising();

        logger.started();

        if (err) {
            logger.startFailed(err);
        }
    }

You can pass any number of parameters into the log function and they will be added to the log message.
