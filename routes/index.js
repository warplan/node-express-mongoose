// import productModel from '../mongoose';
var express = require('express');
var router = express.Router();
var productModel = require('../mongoose');

router.get('/', function(req, res) {
	res.redirect('/list');
})

router.get('/list', function(req, res) {
	var list = [];
	productModel.find(function(err, products) {
		list = products;
		res.render('list', {
			list
		})
	});
})

// 添加商品
router.post('/admin/add/product', function(req, res) {
	var item = req.body;
    var product = new productModel(req.body);

    product.save(function(err) {
    	res.send({
			code: 'success',
			data:{}
		})
    });	
})

// 编辑商品
router.post('/admin/edit/product', function(req, res) {
	var item = req.body;
	console.log(item);
    productModel.update({_id: item.id}, item, function(err) {
    	res.send({
			code: 'success',
			data:{}
		})
    });	
})

// 删除商品
router.post('/admin/delete/product', function(req, res) {
	console.log(req.body.id);
	productModel.findByIdAndRemove({_id: req.body.id}, {}, 
		function() {
			res.send({
				code: 'success',
				data:{}
			})
		}
	)
})

// 搜索商品
router.get('/list/search', function(req, res) {
	var list = [],
	    price = {};
	if (req.query.price1) price.$gte = req.query.price1;
	if (req.query.price2) price.$lte = req.query.price2;

	productModel.find({
		price
	}, function(err, products) {
		list = products;
		res.render('list', {
			list
		})
	});
})

module.exports = router;
