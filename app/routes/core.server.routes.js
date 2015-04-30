'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var invite = require('../../app/controllers/invite.server.controller');
	app.route('/').get(core.index);

	// Setting up the users invite api
	app.route('/addInvite').post(invite.addUser);
	app.route('/updateMember').post(invite.updateUser);
	app.route('/members').get(invite.listUsers);
	app.route('/memberByID/:memberId').get(invite.getUserById);
	//app.route('/getDataFromAPI').get(invite.getDataFromAPI);

	app.param('memberId', invite.memberByID);
};