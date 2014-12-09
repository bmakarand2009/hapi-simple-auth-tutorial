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
    		if (request.auth.isAuthenticated) { 
    			return reply.redirect('/success'); 
    		} 
        	
    		// Show login form from view
            reply.view('login', {
                title: 'Super Informative About Page'
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

        var form =
        '<h1> Register </h1>' +
        '<form method="post" action="register">' +
        '   <p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
        '   <p><input type="password" name="password" value="" placeholder="Password"></p>' +
        '   <p><input type="submit"   value="Login"></p>' +
        '</form>';

        reply(form);
    }
}	

/** 
  * Handles a call to /success and shows private stuff 
  */ 
exports.secret = {
	auth: 'session', 
 	handler: function (request, reply) {
 		console.log('success!');
 		var data = 
 		'<h1> Success! </h1>' +
 		'<p> Welcome to secret page, '+request.auth.credentials.email+'.</p>';
 		'<a href="logout">Log out</a>'; 
     	reply(data);
 	} 
};
