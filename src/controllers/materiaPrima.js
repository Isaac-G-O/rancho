const MateriaCtr = {};
const connect = require('../../DBConexion');

MateriaCtr.getMateriaPrima = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM MateriaPrima;');
    res.json(rows);
}

MateriaCtr.saveMateriaPrima = async (req, res) => {
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Cantidad = req.body.Cantidad;
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO MateriaPrima(Nombre, Descripcion, Cantidad) VALUES (?,?,?)', [
        Nombre,
        Descripcion,
        Cantidad
    ]);
    res.json({
        id: results.insertId,
        ...req.body
    });
}

module.exports = MateriaCtr;