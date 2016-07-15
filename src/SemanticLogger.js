var webLogger = require("./webLogger.js");

class SemanticLogger {
	constructor (request) {
		this.request = request;
		this.log = new webLogger.WebLogger(this.request);
	}

	dispose () {
		this.request = null;
		this.log = null;
	}
}

function debugDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.debug(targetName + '.' + name, args);
	};
}

function verboseDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.verbose(targetName + '.' + name, args);
	};
}

function infoDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.info(targetName + '.' + name, args);
	};
}

function warnDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.warn(targetName + '.' + name, args);
	};
}

function errorDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.error(targetName + '.' + name, args);
	};
}

function completedDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		this.log.info(targetName + '.' + name + ' COMPLETED in:' + (new Date() - this.started), args);

		this.dispose();
	};
}

module.exports = {
	SemanticLogger: SemanticLogger,
	debug: debugDecorator,
	verbose: verboseDecorator,
	info: infoDecorator,
	warn: warnDecorator,
	error: errorDecorator,
	completed: completedDecorator
};

