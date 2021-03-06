var express = require('express.io'),
	session = require('express-session'),
	bodyParser 		= require('body-parser'),
	cookieParser  	= require('cookie-parser'),
	swig	= require('swig'),
	_ 	= require('underscore');

var RediStore	= require('connect-redis')(session);

var server 	= express();
server.http().io();

//variables globales
var users = [];
var menu = [
	    	{
	    		'id':1,
	    		'temp':'tempinicio',
	    		'desc':'Inicio'
	    	},
	    	{
	    		'id':2,
	    		'temp':'tempideas',
	    		'desc':'Ideas'
	    	},
	    	{
	    		'id':3,
	    		'temp':'tempretos',
	    		'desc':'Retos'
	    	},
	    	{
	    		'id':4,
	    		'temp':'tempproyectos',
	    		'desc':'Proyectos'
	    	},
	    	{
	    		'id':5,
	    		'temp':'tempcomunidad',
	    		'desc':'Comunidad'
	    	}
	    ];
//funciones anonimas
var isntLoggedIn = function (req,res,next){
	if (!req.session.email) {
		res.redirect('/');
		return;
	};
	next();
};

var isLoggedIn = function (req,res,next){
	if (req.session.email) {
		res.redirect('/index');
		return;
	};
	next();
};

// Sistema para renderisar vistas
server.engine('html', swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

// Cargar archivos státicos
server.use(express.static('./public'))
server.use(express.static('./app'))

//Agregamos post, cookies y sesiones
server.use(express.logger());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false })); 
server.use(bodyParser.json());

server.use(session({
	secret:"secret key",
	resave: false,
  	saveUninitialized: true,
  	cookie: new RediStore({})
}));

server.get('/app',isntLoggedIn, function(req,res){
	res.render('app',{ 
		user: req.session.user,
		users: users
	});
});

server.get('/',isLoggedIn, function(req,res){
	res.render('home',{
		saludo: 'Login System'
	});
});

server.get('/index',isntLoggedIn, function(req,res){
	res.render('index',{
		user: {
			email: req.session.email,
			pass: req.session.pass
		},
		menuDemo2: menu
	});
});

server.get('/menu', function(req,res){
	res.json(menu);
});

server.get('/log-out',function(req,res){
	_.without(users, req.session.user) 
	req.session.destroy();
	res.redirect('/');
});

server.post('/log-in',function(req,res){
	users.push(req.body.email);
	req.session.email = req.body.email;
	req.session.pass = req.body.pass;
	res.redirect('/index');
});

server.io.route('hello?',function(req){
	req.io.emit('saludo',{
		message: 'serverReady'
	})
});

server.listen(3000);