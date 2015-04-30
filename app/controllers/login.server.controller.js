'use strict';

/**
 * Module dependencies.
 */

var http = require('http'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	Invite = mongoose.model('Invite'),
	_ = require('lodash');


exports.login_request = function(req, res) {
  	var member = req.body;
  	var username = member.username;
  	var pass = member.password;
  	
	Invite.findOne({email: username}, function (err, result){
		/*
		  	msg = 3 [unable to run query]
		  	msg = 2 [invalid password]
		  	msg = 1 [invalid username]
		  	msg = 0 [SUCCESSFUL LOGIN]
	  	*/
	  	var msg = 3;

		if(typeof(result) === 'object' && result !== null && !err){
			//	Username exists
			Invite.findOne({ email: username, password: pass }, function (err, member){
				if(typeof(member) === 'object' && member !== null && !err){
					msg = 0;	//	Password matched with supplied username
					console.log('logged in : '+msg);
					return res.status(200).send({
						message: msg,
						member: member
					});
				}
				else{
					msg = 2;	//	invalid password [error code]
					console.log('invalid password : '+msg);
					return res.status(200).send({
						message: msg
					});
				} 
			});
			
		}
		else{
			msg = 1;	//	invalid username
			console.log('invalid username : '+msg);
			return res.status(200).send({
				message: msg
			});
		}

		
	});
};

