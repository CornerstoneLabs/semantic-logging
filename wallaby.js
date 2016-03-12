module.exports = function (wallaby) {
	return {
		compilers: {
			"src/**/*.js": wallaby.compilers.babel(),
			"spec/**/*.js": wallaby.compilers.babel()
		},

		setup: function () {

		},

		files: [
			{pattern: "node_modules/babel-polyfill/dist/polyfill.js", instrument: false},
			"src/**/*.js",
			"!spec/**/*.spec.js"
		],

		tests: [
			"spec/**/*.spec.js"
		],

		env: {
			type: "node",
			runner: "node",
			params: {
				env: "NODE_ENV=test",
				runner: "--harmony"
			}
		},

		debug: true,

		testFramework: "jasmine"
	};
};
