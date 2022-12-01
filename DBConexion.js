const mysql = require('mysql2/promise');
const config = require('./config');

const connect = async () => {
    const conn = await mysql.createConnection(process.env.DATABASE_URL);
    return conn;
}

module.exports = connect;