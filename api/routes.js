let _ =         require('underscore')
    , config =  require('./config')
    , jwt   =   require('jsonwebtoken')
    , path =    require('path')
    , realtorCtrl   = require('./controllers/RealtorCtrl')
    , divisionCtrl  = require('./controllers/DivisionCtrl');

let routes = [
    {
        path: '/login',
        httpMethod: 'ALL',
        protected: false,
        middleware: [require('./controllers/AuthCtrl')]
    },
    {
        path: '/realtor',
        httpMethod: 'GET',
        protected: true,
        middleware: [realtorCtrl.get]
    },
    {
        path: '/realtor',
        httpMethod: 'POST',
        protected: true,
        middleware: [realtorCtrl.create]
    },
    {
        path: '/realtor',
        httpMethod: 'PUT',
        protected: true,
        middleware: [realtorCtrl.update]
    },
    {
        path: '/realtor',
        httpMethod: 'DELETE',
        protected: true,
        middleware: [realtorCtrl.delete]
    },
    {
        path: '/division',
        httpMethod: 'GET',
        protected: true,
        middleware: [divisionCtrl.get]
    },
    {
        path: '/division',
        httpMethod: 'POST',
        protected: true,
        middleware: [divisionCtrl.create]
    },
    {
        path: '/division',
        httpMethod: 'PUT',
        protected: true,
        middleware: [divisionCtrl.update]
    },
    {
        path: '/division',
        httpMethod: 'DELETE',
        protected: true,
        middleware: [divisionCtrl.delete]
    }
];

module.exports = function(app) {
    _.each(routes, function(route) {
        if (route.protected) {
            route.middleware.unshift(ensureAuthorized);
        }
        let args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            case 'ALL':
                app.all.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
};

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function ensureAuthorized(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.header('token');
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(400).send({success: false, message: 'Failed to authenticate token.'})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
}