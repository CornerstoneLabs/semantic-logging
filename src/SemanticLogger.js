var webLogger = require("./webLogger.js");

class SemanticLogger {
	constructor (request) {
		this.request = request;
	}
}

function debugDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		log.debug(targetName + '.' + name, args);
	};
}

function verboseDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		log.verbose(targetName + '.' + name, args);
	};
}

function infoDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		log.info(targetName + '.' + name, args);
	};
}

function warnDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		log.warn(targetName + '.' + name, args);
	};
}

function errorDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		log.error(targetName + '.' + name, args);
	};
}

module.exports = {
	SemanticLogger: SemanticLogger,
	debug: debugDecorator,
	verbose: verboseDecorator,
	info: infoDecorator,
	warn: warnDecorator,
	error: errorDecorator
};

