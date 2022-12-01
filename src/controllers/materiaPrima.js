const MateriaCtr = {};
const connect = require('../../DBConexion');

MateriaCtr.getMateriaPrima = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM materiaprima;');
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