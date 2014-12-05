'use strict';
var    joi         = require('joi');
var Pages = require('./pages');  
var Authentication = require('./authentication');


var loginRoutes = [
    { 
        method: 'GET',    
        path: '/',           
        config: Pages.index    
    },    
    { method: 'GET',    path: '/login',       config: Pages.login    },

    { method: 'GET',    path: '/register',    config: Pages.register },
    { method: 'POST',   path: '/login',       config: Authentication.login },
   // { method: 'GET',    path: '/logout',      config: Authentication.logout },
    { method: 'POST',   path: '/register',    config: Authentication.register },

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