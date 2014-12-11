'use strict';
var joi = require('joi');
var Pages = require('./pages');  
var Authentication = require('./authentication');
var    wreck     = require('wreck');


var handler = {}
handler.serveWeather = function (request, reply) {
    console.log(request.params)
    var siteId = request.params.id
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    console.log("calling weather url " + url)
    wreck.get(url, function (err, res, payload) {
            reply(err || payload); //return type is text/html but use JSON.parse() if you now the type is application/JSON
        });
};

var loginRoutes = [
    { method: 'GET', 	path: '/', 				config: Pages.index },    
    { method: 'GET',    path: '/login',    		config: Pages.login },
    { method: 'GET',    path: '/register',  	config: Pages.register },
    { method: 'GET',    path: '/success',		config: Pages.success },
    { method: 'GET',	path: '/forgot',    	config: Pages.forgot },
    { method: 'POST',   path: '/forgot',    	config: Authentication.forgot },
    { method: 'POST',   path: '/login',			config: Authentication.login },
    { method: 'GET',	path: '/logout',		config: Authentication.logout },        	
    { method: 'POST',   path: '/register',    	config: Authentication.register },

];

var routes = [
    {
        method: 'GET',
        path : '/api/weather/{id}' ,
        config:{
        	auth: 'session', 
        	handler: handler.serveWeather,
            description: 'Get Current Weather',
            notes: 'Returns the weather as per the site',
            tags: ['api'],
            validate: {
                params: {
                    id: joi.number()
                            .required()
                            .description('siteid'),
                }
            }
        }
    }
]

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


var endPoints = loginRoutes.concat(routes,otherRoutes)

exports.endPoints = endPoints;