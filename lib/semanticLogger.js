'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webLogger = require("./webLogger.js");

var SemanticLogger = function () {
	function SemanticLogger(request) {
		_classCallCheck(this, SemanticLogger);

		this.request = request;
		this.log = new webLogger.WebLogger(this.request);
	}

	_createClass(SemanticLogger, [{
		key: 'dispose',
		value: function dispose() {
			this.request = null;
			this.log = null;
		}
	}]);

	return SemanticLogger;
}();

function debugDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		this.log.debug(targetName + '.' + name, args);
	};
}

function verboseDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		this.log.verbose(targetName + '.' + name, args);
	};
}

function infoDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		this.log.info(targetName + '.' + name, args);
	};
}

function warnDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		this.log.warn(targetName + '.' + name, args);
	};
}

function errorDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		this.log.error(targetName + '.' + name, args);
	};
}

function completedDecorator(target, name, descriptor) {
	descriptor.value = function () {
		var targetName = target.constructor.name;

		for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			args[_key6] = arguments[_key6];
		}

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