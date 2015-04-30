'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invite Schema
 */
var ProductSchema = new Schema({
	artist: {
		type: String
	}, 
	title: {
		type: String
	}, 
	dimensions: {
		type: String
	}, 
	medium: {
		type: String
	}, 
	price: {
		type: Number
	}, 
	provenance: {
		type: String
	}, 
	img_src: {
		type: String
	}
},

{ collection: 'product' }

);

mongoose.model('Product', ProductSchema);