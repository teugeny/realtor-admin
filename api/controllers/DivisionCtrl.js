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
            data = await db.query("select * from subdivisions where id = " + req.query.id);
        } else {
            data = await db.query("select * from subdivisions");
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
        let query = prepare.insert('subdivisions', req.body);
        try {
            let insert = db.query(query);
            res.status(200).send({success: true, message: 'Success', rows: insert});
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
    update: async function(req, res) {
        delete req.body.created;
        let query = prepare.update('subdivisions', req.body);
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
        let query = prepare.delete('subdivisions','id', req.body.id);
        try {
            let remove = await db.query(query);
            res.status(200).send(remove);
        } catch(e) {
            res.status(400).send({success: false, message: 'Failed'});
        }
    }
};