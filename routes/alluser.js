var	BD = require('../BD')
	,	sanitize = require('validator').sanitize;

var db = BD.mongodb();
var producto_schema = require('../models/producto');
var Producto = db.model('Producto', producto_schema);


exports.productos = function(req, res){
	Producto.find(function(err, productos) {
		if(err) res.send('1');
	  else	res.render('index/product/view_productos', { hola: productos });
  });
}

exports.product = function(req, res){
	if(req.body.id){
		id = sanitize(req.body.id).trim();
		id = sanitize(id).xss();
		id = sanitize(id).entityDecode();
		
 	  Producto.findById(id, function(err, producto) {
 	  	if(err) res.send('1');
 	  	else{
 	  		if(producto==null){
	 	  		res.render('index/product/producto');	
 	  		}
 	  		else{
	 	  		console.log(producto.titulo);	
	 	  		res.render('index/product/producto', { producto: producto, sesion:req.session.user });	
 	  		}
 	  	}
    });
	}
	else
	 res.send('1');
}