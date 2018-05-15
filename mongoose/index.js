// 数据库连接
var uuid = require('node-uuid');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mart');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected');
});

// Schema定义数据的数据结构
var ProductSchema = mongoose.Schema({
	id: {
		type: String,
        default: uuid.v1
	},
    name: String,
    price: Number,
    url: String
});

// Schema只是定义了数据结构，而对数据的处理需要model去实现
var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
