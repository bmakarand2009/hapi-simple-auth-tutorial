'use strict';
//var Path    = require('path'),
var    Hapi		= require('hapi');
var    routes	= require('./routes.js');

var serverOptions = {
    router: { isCaseSensitive: true },
    cors: true
};

var server = new Hapi.Server(~~process.env.PORT || 3000, '0.0.0.0', serverOptions);

server.pack.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }
    

    
    // Set auth strategy
    server.auth.strategy('session', 'cookie', {
        password: 'worldofwalmart', // cookie secret
        cookie: 'session', // Cookie name
        redirectTo: '/login', // Let's handle our own redirections
        isSecure: false, // required for non-https applications
        // ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
    
	// Print some information about the incoming request for debugging purposes
	server.ext('onRequest', function (request, next) {  
	    console.log ("Request recieved: ["+request.path, request.query+"]");
	    var viewDir = __dirname
	    console.log("view dir is: ["+ viewDir+"]")
	    next();
	});
	
	server.views({
	    engines: {
	        //jade: require('jade') 
	        html: require('handlebars')
	    },
	    path: __dirname+'/views',
	    isCached: false
	//    layoutPath: './views/layout',
	//    helpersPath: './views/helpers'
	});
	
	server.route(routes.endPoints);
	
	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});