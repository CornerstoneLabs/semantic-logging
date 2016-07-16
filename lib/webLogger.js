"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _adapter = {
	log: function log(level, message) {
		console.log(message);
	}
};

var WebLogger = function () {
	_createClass(WebLogger, [{
		key: "dispose",
		value: function dispose() {
			this.user = null;
			this.startedDateTime = null;
			this.requestId = null;
		}
	}]);

	function WebLogger(request) {
		_classCallCheck(this, WebLogger);

		this.user = null;
		this.requestId = null;
		this.startedDateTime = new Date();

		if (typeof request !== "undefined") {
			if (typeof request.headers !== "undefined" && typeof request.headers["request-id"] !== "undefined") {
				this.requestId = request.headers["request-id"];
			}
		}
	}

	_createClass(WebLogger, [{
		key: "attachUser",
		value: function attachUser(meta) {
			if (typeof this.user !== "undefined" && this.user !== null) {
				meta.user = this.user;
			}
		}
	}, {
		key: "attachTimeOffset",
		value: function attachTimeOffset(meta) {
			if (typeof meta === "undefined") {
				meta = {};
			}

			meta['latency'] = new Date() - this.startedDateTime;

			return meta;
		}
	}, {
		key: "attachRequest",
		value: function attachRequest(meta) {
			if (this.requestId !== null) {
				meta.requestId = this.requestId;
			}

			return meta;
		}
	}, {
		key: "debug",
		value: function debug(message, extra) {
			var meta = {};

			if (typeof extra !== "undefined") {
				meta = extra;
			}

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			_adapter.log("debug", message, meta);
		}
	}, {
		key: "verbose",
		value: function verbose(message, extra) {
			var meta = {};

			if (typeof extra !== "undefined") {
				meta = extra;
			}

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			_adapter.log("verbose", message, meta);
		}
	}, {
		key: "info",
		value: function info(message, extra) {
			var meta = {};

			if (typeof extra !== "undefined") {
				meta = extra;
			}

			var messageData = {};
			messageData = this.attachTimeOffset(messageData);
			messageData = this.attachRequest(messageData);
			messageData.message = message;

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			var stringify = JSON.stringify(messageData);

			_adapter.log("info", stringify, meta);
		}
	}, {
		key: "completed",
		value: function completed(message, extra) {
			var meta = {};

			if (typeof extra !== "undefined") {
				meta = extra;
			}

			var messageData = {};
			messageData = this.attachTimeOffset(messageData);
			messageData = this.attachRequest(messageData);
			messageData.message = message;
			messageData.COMPLETED = new Date() - this.startedDateTime;

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			var stringify = JSON.stringify(messageData);

			_adapter.log("info", stringify, meta);
		}
	}, {
		key: "warn",
		value: function warn(message, extra) {
			var meta = {};

			if (typeof extra !== "undefined") {
				meta = extra;
			}

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			_adapter.log("warn", message, meta);
		}
	}, {
		key: "error",
		value: function error(message, err) {
			var meta = {};

			this.attachTimeOffset(meta);
			this.attachUser(meta);
			this.attachRequest(meta);

			if (typeof err !== "undefined") {
				meta.details = err.toString();
			}

			_adapter.log("error", message, meta);
		}
	}]);

	return WebLogger;
}();

module.exports = {
	initialise: function initialise(adapter) {
		_adapter = adapter;
	},

	getAdapter: function getAdapter() {
		return _adapter;
	},

	WebLogger: WebLogger
};