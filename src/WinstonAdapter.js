var winston = require("winston");

// /*jshint -W030 */
// require("winston-logio");
// /*jshint +W030 */

// var logFileName = "/opt/logs/nodejs.log";
// var options = {
// 	filename: logFileName
// };

//winston.add(winston.transports.File, options);

module.exports = {
	log: function (level, message, meta) {
		winston.log(level, message, meta);
	}
};
