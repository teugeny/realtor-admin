let _ = require('underscore')
    , config = require('../config');

module.exports = {
    /**
     *
     * @param items
     * @param from
     * @param where
     * @returns {string}
     */
    select: (items, from, where) => {
        let query = "SELECT ";
        _.each(items, (item, index) => {
            query += item + ", ";
        });

        query = query.slice(0,-2);
        query += " FROM";
        _.each(from, function(item) {
            query += item + ", ";
        });
        query = query.slice(0,-2);
        query += " WHERE " + where.what + " = " + where.relation;

        return query;
    },

    /**
     *
     * @param table
     * @param data
     * @returns {string}
     */
    insert: (table, data) => {
        let query = "INSERT INTO `"+config.db.database+"`.`"+table+"` (",
            values = "VALUES (";

        _.each(data, function(item, index) {
            query += "`"+index+"`,";
            values += "'"+item+"',";
        });

        query = query.slice(0,-1);
        values = values.slice(0,-1);
        query += ") " +values + ")";

        return query;
    },

    /**
     *
     * @param table
     * @param data
     * @param where
     * @returns {string}
     */
    update: (table, data, where) => {
        let query = "UPDATE `"+config.db.database+"`.`"+table+"` SET ",
            id = data.id;

        delete data.id;

        _.each(data, function(item, index) {
            query += "`"+index+"`='"+item+"',";
        });

        query = query.slice(0,-1);

        if (where) {
            query += " WHERE `"+where+"`='"+data[where]+"';";
        } else {
            query += " WHERE `id`='"+id+"';";
        }

        return query;
    },

    /**
     *
     * @param table
     * @param key
     * @param value
     * @param where
     * @returns {string}
     */
    delete: (table, key, value, where) => {
        let query = "DELETE FROM `"+config.db.database+"`.`"+table+"` WHERE `"+key+"`='"+value+"'";

        if (where) {
            query += " AND `"+where.key+"`='"+where.value+"';";
        }

        return query;
    }
};
