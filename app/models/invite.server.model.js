'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invite Schema
 */
var InviteSchema = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type:String
	},
	status: {
		type: String
	},
	pro_views: {
		type: String
		
	},
	net_sales: {
		type: String
	},
	own_vs_rent: {
		type: String
	},
	interests: {
		type: String
	},
	gender: {
		type: String
	},
	age: {
		type: Number
	},
	product_assigned: {
		type: []
	}
},

{ collection: 'invite' }

);

mongoose.model('Invite', InviteSchema);