var _adapter = {
	log: function (level, message) {
		console.log(message);
	}
};

class WebLogger {

	dispose () {
		this.user = null;
		this.started = null;
		this.requestId = null;
	}

	constructor (request) {
		this.user = null;
		this.requestId = null;
		this.started = new Date();

		if (typeof request !== "undefined") {
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

	attachTimeOffset (meta) {
		meta['latency'] = new Date() - this.started;
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

		this.attachTimeOffset(meta);
		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("debug", message, meta);
	}

	verbose (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachTimeOffset(meta);
		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("verbose", message, meta);
	}

	info (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachTimeOffset(meta);
		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("info", message, meta);
	}

	warn (message, extra) {
		var meta = {};

		if (typeof extra !== "undefined") {
			meta = extra;
		}

		this.attachTimeOffset(meta);
		this.attachUser(meta);
		this.attachRequest(meta);

		_adapter.log("warn", message, meta);
	}


	error (message, err) {
		var meta = {};

		this.attachTimeOffset(meta);
		this.attachUser(meta);
		this.attachRequest(meta);

		if (typeof err !== "undefined") {
			meta.details = err.toString()
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
