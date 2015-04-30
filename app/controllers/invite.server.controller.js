'use strict';

/**
 * Module dependencies.
 */

var http = require('http');
var https = require('https');

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Invite = mongoose.model('Invite'),
	_ = require('lodash');

exports.addUser = function(req, res) {
	var member = req.body;
    
    // Set password for each user for now
    member.password = 'pass123';

	var invite = new Invite(member);
	var msg = '';

	if(invite){
		invite.save(function(err,result) {
			if (err) {
				msg = 'failed to save user details.';
			} else {
				//	msg = 'user details has been save'+res.json(invite);
				msg = 'user details has been save';
			}
		});
	} else {
		msg = 'model is not initialized.';
	}

	return res.status(200).send({
		message: msg
	});

};

exports.updateUser = function(req, res) {
	var member = req.body;
	var msg = '';
	var id = member.memberid;
	delete member.memberid;
	delete member.member_status;
	console.log(JSON.stringify(member));

	if (id) {
	    Invite.update({_id: id}, member, {upsert: false}, function (err) {
	    	if(err){
	    		msg = 'failed to update user details.';
	    	} else {
	    		msg = 'user details updated.';
	    	}
	    });
	}

	return res.status(200).send({
		message: msg
	});
};

exports.listUsers = function(req, res) {
	Invite.find(function(err, result){
		res.status(200).json(result);
	});
};

exports.getUserById = function(req, res) {
	res.json(req.member);
};

exports.memberByID = function(req, res, next, id) {
	Invite.findById(id).exec(function(err, member) {
		if (err) return next(err);
		if (!member) return next(new Error('Failed to load member ' + id));
		req.member = member;
		next();
	});
};