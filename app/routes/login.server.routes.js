'use strict';

module.exports = function(app) {
	// Root routing
	var login = require('../../app/controllers/login.server.controller');

	app.route('/login_request').post(login.login_request);
};