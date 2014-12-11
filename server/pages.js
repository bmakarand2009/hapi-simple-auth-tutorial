exports.index = {
	//auth: 'session',
    handler: function (request, reply) {
        var data =
        '<h1> Hi there! </h1>' +
        '<p> Would you like to <a href="login">login</a> or <a href="register">register</a>? </p>';

        reply(data);
    }
}

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {  
	    plugins: {
	        'hapi-auth-cookie': {
	            redirectTo: false
	        }
	    },
        handler: function(request, reply){

        	// The user is already logged in, redirect it to the hideout
    		if (request.auth.isAuthenticated)
    			return reply.redirect('/success');
        	
        	var msg = '';
        	console.log('login'+request.query);
        	if (request.query.status == 'error')
        		msg = 'Bad password! Please, try again.';
        	else if (request.query.status == 'registered')
        		msg = 'User "'+request.query.username+'" was registered!';
        	
    		// Show login form from view
            reply.view('login', {
                title: 'Login Page',
                message: msg,
            });
        },
		auth: {
			mode: 'try',
			strategy: 'session'
		},
        app: {
            name: 'login'
        }
}

/**
 * Handles a call to /register and shows a registration form
 */
exports.register = {  
    handler: function (request, reply) {
        reply.view('register', {
            title: 'Register Page'
        });
    }
}	

/** 
  * Handles a call to /success and shows private stuff 
  */ 
exports.success = {
	auth: 'session', 
 	handler: function (request, reply) {
 		console.log('success!');
 		console.log(request.auth.credentials);
 		reply.view('success', {
 			title: 'Success!',
 			id: request.auth.credentials.id,
 		});
 	} 
};

/**
 * Handles a call to /register and shows a registration form
 */
exports.forgot = {  
    handler: function (request, reply) {
    	
    	var msg = '';
    	console.log('login'+request.query);
    	if (request.query.status == 'error')
    		msg = "User doesn't exists!";
   	
        reply.view('forgot', {
            title: 'Forgot Password Page',
            message: msg
        });
    }
}