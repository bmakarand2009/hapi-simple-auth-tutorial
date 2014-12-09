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
exports.secret = {
	auth: 'session', 
 	handler: function (request, reply) {
 		console.log('success!');
 		console.log(request.credentials);
 		var data = 
	 		'<h1> Success! </h1>'
	 		+ '<p> Welcome to secret page, '+request.auth.credentials.id+'.</p>'
	 		+ '<a href="/logout">Log out</a>'; 
     	reply(data);
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