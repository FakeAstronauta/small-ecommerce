const mysql =  require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database); // connections get stored; but only works with callbacks not promises (async/await)

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANU CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

// convert a method that returns responses using a callback function to return responses in a promise object
pool.query = promisify(pool.query);

module.exports = pool;