var webLogger = require("./WebLogger.js");

class SemanticLogger {
	constructor (request) {
		this.request = request;
	}
}

function debugDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		log.debug(name);
	};
}

function verboseDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		log.verbose(name);
	};
}

function infoDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		log.info(name, args);
	};
}

function warnDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		log.warn(name);
	};
}

function errorDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		let log = new webLogger.WebLogger(this.request);
		log.error(name, args);
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

