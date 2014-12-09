'use strict';
var joi = require('joi');
var Pages = require('./pages');  
var Authentication = require('./authentication');


var loginRoutes = [
    { method: 'GET', 	path: '/', 				config: Pages.index },    
    { method: 'GET',    path: '/login',    		config: Pages.login },
    { method: 'GET',    path: '/register',  	config: Pages.register },
    { method: 'GET',    path: '/success',		config: Pages.secret },
    { method: 'POST',   path: '/login',			config: Authentication.login },
//    	config: {
//    		handler: Authentication.login,
//	        auth: {
//	            mode: 'try',
//	            strategy: 'session'
//	        },
//	        plugins: {
//	            'hapi-auth-cookie': {
//	                redirectTo: false
//	            }
//	        }
//	    }
//    },
    
    { method: 'GET',	path: '/logout',		config: Authentication.logout},        	
//    	config: {
//    		handler: Authentication.logout,
//    		auth: 'session'
//    	}
//     },
    { method: 'POST',   path: '/register',    	config: Authentication.register },
];


var otherRoutes = [
    {
        method:'GET',
        path:'/{param*}',
        handler:{
            directory:{
                path: 'public',
                listing:false
            }
        }
    }
];


var endPoints = loginRoutes.concat(otherRoutes)

exports.endPoints = endPoints;