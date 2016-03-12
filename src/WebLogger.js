var _adapter = {
	log: function (level, message) {
		console.log(message);
	}
};

class WebLogger {

	constructor (request) {
		this.user = null;
		this.requestId = null;

		if (typeof request !== "undefined") {
			if (typeof request.user !== "undefined") {
				this.user = request.user;
			}

			if ((typeof request.headers !== "undefined") &&
				(typeof request.headers["request-id"] !== "undefined")) {
				this.requestId = request.headers["request-id"];
			}
		}
	}

	attachUser (meta) {
		if ((typeof this.user !== "undefined") && (this.user !== null)) {
			meta.user = this.user;
		}
	}

	attachRequest (meta) {
		if (this.requestId !== null) {
			meta.requestId = this.requestId;
		}
	}

	debug (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("debug", message, meta);
	}

	verbose (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("verbose", message, meta);
	}

	info (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("info", message, meta);
	}

	warn (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("warn", message, meta);
	}


	error (message, err) {
		var meta = {};

		this.attachUser(meta);
		this.attachRequest(meta);

		if (typeof err !== "undefined") {
			meta.details = err;
		}

		_adapter.log("error", message, meta);
	}
}

module.exports = {
	initialise: function (adapter) {
		_adapter = adapter;
	},

	getAdapter: function () {
		return _adapter;
	},

	WebLogger: WebLogger
};
