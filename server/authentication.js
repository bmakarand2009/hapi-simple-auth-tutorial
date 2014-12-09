var Joi = require('joi');  
//var User = require('../models/user').User;

var users = {
    fer: {
        id: 'fer',
        password: 'admin',
        name: 'fer min'
    },
    don: {
        id: 'don',
        password: '123',
        name: 'don min'
    },	
};

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
    	console.log('[login] ini');
    	var user_data = users[request.payload.email];
    	
        if (request.payload.password == user_data.password) {
	    	console.log('[login] password ok, so saving session')
			request.auth.session.set(user_data);
			
			console.log('[login] redirecting to /success')
			return reply.redirect('/success');
		}

    	console.log('bad password')
    	
		return reply.redirect('/login?status=error');
    },
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
//    validate: {
//        payload: {
//            email: Joi.string().email().required(),
//            password: Joi.string().required()
//        }
//    },
    handler: function(request, reply) {
    	users[request.payload.email] = {
    		name: {
    	        id: request.payload.email,
    	        password: request.payload.password
    	    }
    	};
        //reply('Hi your e-mail is "' + request.payload.email + '", that\'s all!');
    	return reply.redirect('/login?status=registered&username='+request.payload.email);
    }
};

exports.logout = {
     auth: 'session',
     handler: function (request, reply) {
         request.auth.session.clear();
         reply().redirect('/');
     }
};

exports.forgot = {
//	    validate: {
//	        payload: {
//	            email: Joi.string().email().required(),
//	        }
//	    },
	    handler: function(request, reply) {
	    	console.log('[forgot] ini')
	    	var user = users[request.payload.email];
	    	if (typeof user == 'undefined') {
	    		return reply.redirect('/forgot?status=error');
	    	}
	    	
	    	// var password = 'PASSWORD';
	    	console.log('[forgot] user: ' + user.password)
	        reply('The password for the email "' + request.payload.email + '", is "'+ user.password + '"');
	    }
	};