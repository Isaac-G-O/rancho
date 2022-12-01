const AlimentoVentaCtr = {};
const connect = require('../../DBConexion');

AlimentoVentaCtr.getDataAlimentoVenta = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Alimento_Venta');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
    res.json(rows);
};

AlimentoVentaCtr.getDataAlimento = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Alimento_Venta WHERE id = ?', [
        id
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existen el registro con id: ' + id,
        ok: false
    }) :
    res.json(rows);
};

AlimentoVentaCtr.getAlimentoVentaCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM Alimento_Venta');
    res.json({
        TotalAlimentoVenta: rows[0]['COUNT(*)'],
        ok: true
    });
};

AlimentoVentaCtr.createAlimento = async (req, res) => {
    const Nombre = req.body.Nombre;
    const PrecioUnitario = req.body.PrecioUnitario;
    const Cantidad = req.body.Cantidad;
    const TipoUnidad = req.body.TipoUnidad;
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO Alimento_Venta (Nombre, PrecioUnitario, Cantidad, TipoUnidad) VALUES (?,?,?,?)', [
        Nombre,
        PrecioUnitario,
        Cantidad,
        TipoUnidad
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
        ok: true,
    });
};

AlimentoVentaCtr.deleteAlimento = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('DELETE FROM Alimento_Venta WHERE id = ?', [
        id
    ]);
    result[0].affectedRows !== 0 ?
        res.json({
            msg: 'Registro eliminado con exito',
            ok: true
        }) :
        res.json({
            msg: 'Error al eliminar...',
            ok: false
        });
};

AlimentoVentaCtr.updateAlimento = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('UPDATE Alimento_Venta SET ? WHERE id = ?', [
        req.body,
        id
    ]);
    res.json(result);
};

module.exports = AlimentoVentaCtr;