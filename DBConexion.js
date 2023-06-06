const mysql = require('mysql2/promise');
const config = require('./config');

const connect = async () => {
    const conn = await mysql.createConnection(process.env.DATABASE_URL);
    return conn;
}

const localConnection = async () => {
    const conn = await mysql.createConnection(config);
    return conn;
}

module.exports = {
    connect,
    localConnection
};