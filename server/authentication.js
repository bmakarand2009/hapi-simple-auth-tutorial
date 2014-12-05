var Joi = require('joi');  
//var User = require('../models/user').User;

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {  
    //validate: {
      //  payload: {
        //    email: Joi.string().email().required(),
          //  password: Joi.string().required()
        //}
    //},
    handler: function (request, reply) {
        reply('Hi your e-mail is "' + request.payload.email + request.payload.password + '", that\'s all!');
        //reply.view('loginpage')
    }
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

// exports.logout = {
//     auth: 'session',
//     handler: function (request, reply) {
//         request.auth.session.clear();
//         reply().redirect('/');
//     }
// };