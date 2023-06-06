const DireccionesCtr = {};
const { connect } = require('../../DBConexion');

DireccionesCtr.getDataDirecciones = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM direcciones');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) : res.json(rows);
};

DireccionesCtr.getDataDireccion = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM direcciones WHERE id = ?', [
        id
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existe el registro con el id: ' + id,
        ok: false
    }) : 
        res.json(rows);
};

DireccionesCtr.getDireccionesCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM direcciones');
    res.json({
        TotalDirecciones: rows[0]['COUNT(*)'],
        ok: true
    });
};

DireccionesCtr.createDireccion = async (req, res) => {
    const Calle = req.body.Calle;
    const Numero = req.body.Numero;
    const Colonia = req.body.Colonia;
    const CP = req.body.CP;
    const Municipio = req.body.Municipio;
    const Estado = req.body.Estado;
    const Pais = req.body.Pais;
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO direcciones (Calle, Numero, Colonia, CP, Municipio, Estado, Pais) VALUES (?,?,?,?,?,?,?)', [
        Calle,
        Numero,
        Colonia,
        CP,
        Municipio,
        Estado,
        Pais
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
        ok: true
    });
};

DireccionesCtr.deleteDireccion = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('DELETE FROM direcciones WHERE id = ?', [id]);
    result[0].affectedRows !== 0 ?
        res.json({
            msg: 'Direccion eliminada con exito',
            ok: true
        }) : 
        res.json({
            msg: 'Error al eliminar...',
            ok: false
        });
};

DireccionesCtr.updateDireccion = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('UPDATE direcciones SET ? WHERE id = ?', [
        req.body,
        id
    ]);
    res.json(result);
};

module.exports = DireccionesCtr;