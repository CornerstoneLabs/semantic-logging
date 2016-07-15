'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webLogger = require("./webLogger.js");

var SemanticLogger = function SemanticLogger(request) {
	_classCallCheck(this, SemanticLogger);

	this.request = request;
	this.started = new Date();
};

function timeOffset(started) {
	return new Date() - started;
}

function debugDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		args['latency'] = timeOffset(this.started);

		log.debug(targetName + '.' + name, args);
	};
}

function verboseDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		args['latency'] = timeOffset(this.started);

		log.verbose(targetName + '.' + name, args);
	};
}

function infoDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		args['latency'] = timeOffset(this.started);

		log.info(targetName + '.' + name, args);
	};
}

function warnDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		args['latency'] = timeOffset(this.started);

		log.warn(targetName + '.' + name, args);
	};
}

function errorDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var log = new webLogger.WebLogger(this.request);
		var targetName = target.constructor.name;

		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		args['latency'] = timeOffset(this.started);

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