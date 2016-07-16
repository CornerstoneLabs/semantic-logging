var webLogger = require("./webLogger.js");

class SemanticLogger {
	constructor (request) {
		this.request = request;
		this.startedDateTime = new Date();
		this.log = new webLogger.WebLogger(this.request);
	}

	attachTimeOffset (meta) {
		if (typeof meta === "undefined") {
			meta = {}
		}

		meta['latency'] = new Date() - this.startedDateTime;

		return meta;
	}

	dispose () {
		this.request = null;
		this.log = null;
	}
}

function debugDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.debug(targetName + '.' + name, args);
	};
}

function verboseDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.verbose(targetName + '.' + name, args);
	};
}

function infoDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.info(targetName + '.' + name, args);
	};
}

function warnDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.warn(targetName + '.' + name, args);
	};
}

function errorDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.error(targetName + '.' + name, args);
	};
}

function completedDecorator (target, name, descriptor) {
	descriptor.value = function (...args) {
		var targetName = target.constructor.name;

		args = this.attachTimeOffset(args);
		this.log.completed(targetName + '.' + name, args);

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

