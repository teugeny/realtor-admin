let mysql = require('mysql');
let config = require('../config');
let holders = require('named-placeholders')();
let connection = null;

function mysqlConnect()
{
    connection = mysql.createConnection(config.db);
    connection.on('error', mysqlError);
    connection.connect();
}

function mysqlError(error)
{
    console.log('ERROR CONNECTION:', error.code);
}

mysqlConnect();

module.exports = {
    query: function(query, params)
    {
        return new Promise(function(resolve, reject)
        {
            function restart()
            {
                mysqlConnect();
                setTimeout(request, 2000);
            }

            function request()
            {
                if (connection.state === 'authenticated')
                {
                    connection.query(query, function(error, rows, fields)
                    {
                        if (error)
                        {
                            if (connection.state === 'authenticated')
                            {
                                console.log('DB ERROR:', query);
                                console.log('DB ERROR:', params);
                                console.log('DB ERROR:', error);
                            }
                            else
                            {
                                console.log('DB ERROR:', error.code);
                                restart();
                            }
                        }
                        else
                        {
                            resolve(rows);
                        }

                    });
                }
                else
                {
                    restart();
                }
            }

            request();
        });
    }
};