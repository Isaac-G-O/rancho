const MateriaCtr = {};
const { connect, localConnection } = require('../../DBConexion');
const ScriptsCtr = require('./scripts');

MateriaCtr.getMateriaPrima = async (req, res) => {
    const connection = await connect();
    const localDBConnection = await localConnection();
    const startServer = new Date();
    const [rows] = await connection.query('SELECT * FROM materiaprima;');
    const endServer = new Date();
    const serverTime = endServer - startServer;
    const startLocal = new Date();
    await localDBConnection.query('SELECT * FROM materiaprima;');
    const endLocal = new Date();
    const localTime = endLocal - startLocal;
    await ScriptsCtr.saveResponseTime('Materia_Prima', localTime, serverTime);
    res.json(rows);
}

MateriaCtr.saveMateriaPrima = async (req, res) => {
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Cantidad = req.body.Cantidad;
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO materiaprima(Nombre, Descripcion, Cantidad) VALUES (?,?,?)', [
        Nombre,
        Descripcion,
        Cantidad
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
        ok: true,
    });
}

module.exports = MateriaCtr;