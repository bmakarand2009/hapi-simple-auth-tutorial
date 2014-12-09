var Joi = require('joi');  
//var User = require('../models/user').User;

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {
	auth: {
        mode: 'try',
        strategy: 'session'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
//    validate: {
//    	payload: {
//    		email: Joi.string().email().required(),
//    		password: Joi.string().required()
//    	}
//    },
    handler: function (request, reply) {
        // reply('Hi your e-mail is "' + request.payload.email + request.payload.password + '", that\'s all!');
        var users = {
    	    fer: {
    	        id: 'fer',
    	        password: 'admin123',
    	        name: 'fer min'
    	    }
    	};
        
    	console.log('[login] ini');
    	var user_data = users[request.payload.email];
    	
        if (request.payload.password == user_data.password) {
	    	console.log('[login] password ok, so saving session')
			request.auth.session.set(user_data);
			
			console.log('[login] redirecting to /success')
			return reply.redirect('/success');
		}

    	console.log('bad password')
		return reply('Bad password for "' + request.payload.email + '"');
    },
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        reply('Hi your e-mail is "' + request.payload.email + '", that\'s all!');
    }
};

exports.logout = {
     auth: 'session',
     handler: function (request, reply) {
         request.auth.session.clear();
         reply().redirect('/');
     }
 };
