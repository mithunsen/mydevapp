'use strict';

/**
 * Module dependencies.
 */

var http = require('http'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	Product = mongoose.model('Product'),
	_ = require('lodash');


exports.postImage = function(req, res) {
  var uploaded_file_info = req.files;
	
  if(typeof(uploaded_file_info) === 'object' && uploaded_file_info.files.path !== ''){
    res.status(200).send(uploaded_file_info.files.path);
  }
};

exports.addProduct = function(req, res) {
	var prod_cred = req.body;

	var product = new Product(prod_cred);
	var msg = '';

	if(product){
		product.save(function(err,result) {
			if (err) {
				msg = 'failed to save product details.';
			} else {
				msg = 'product details has been save';
			}
		});
	} else {
		msg = 'model is not initialized.';
	}

	return res.status(200).send({
		message: msg
	});

};

exports.getProductList = function(req,res){
	Product.find(function(err, result){
		res.status(200).json(result);
	});
};

exports.getProductListByIds = function(req, res) {
	var req_ids = req.body;

	var param = {
		_id : {
			$in: req_ids.ids
		}
	};

	Product.find(param, function(err, result){
		res.status(200).json(result);
	});
};

exports.productByID = function(req, res, next, id) {
	Product.findById(id).exec(function(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('Failed to load product ' + id));
		req.product = product;
		next();
	});
};