let db =        require('../helpers/db'),
    config =    require('../config'),
    jwt =       require('jsonwebtoken');

module.exports = async function(req, res)
{
    let query = "SELECT * FROM users WHERE (username = '" +
        req.body.username+ "') AND password = '" + req.body.password + "'";

    let user = await db.query(query);
    if (user.length > 0) {
        let token = jwt.sign({user:user}, config.secret, {expiresIn : 60*60*24});
        res.status(200).send({
            user: user,
            token: token
        })
    } else {
        res.status(400).send({
            error: 'Not auth'
        });
    }
};