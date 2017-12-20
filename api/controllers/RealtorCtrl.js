let db = require('../helpers/db');
let prepare = require('../helpers/prepareQuery');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    get: async function(req, res) {
        let data;
        if (req.query.id) {
            data = await db.query("select * from realtors where id = " + req.query.id);
        } else if (req.query.from && req.query.to) {
            let sort = req.query;
            data = await db.query("SELECT * FROM realtors where registered > '"+ sort.from +"' and registered < '" + sort.to +"'");
        } else {
            data = await db.query("select * from realtors");
        }

        res.status(200).send(data);
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    create: async function(req, res) {
        let query = prepare.insert('realtors',req.body);
        try {
            let insert = db.query(query);
            res.status(200).send(insert);
        } catch(e) {
            res.status(400).send({success: false, message: "Failed"});
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    update: async function(req, res) {
        delete req.body.registered;
        delete req.body.guid;
        let query = prepare.update('realtors',req.body);
        try {
            let update = await db.query(query);
            res.status(200).send(update);
        } catch(e) {
            res.status(400).send({success: false, message: 'Failed'});
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    delete: async function(req, res) {
        let query = prepare.delete('realtors','id',req.body.id);
        try {
            let remove = await db.query(query);
            res.status(200).send(remove);
        } catch(e) {
            res.status(400).send({success: false, message: 'Failed'});
        }
    }
};