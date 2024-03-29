const AlimentoVentaCtr = {};
const { connect, localConnection } = require('../../DBConexion');
// const { connect, OtherDeviceConnection, localConnection } = require('../../DBConexion');
const ScriptsCtr = require('./scripts');

AlimentoVentaCtr.getDataAlimentoVenta = async (req, res) => {
    const connection = await connect();
    const localDBConnection = await localConnection();
    const startServer = new Date();
    const [rows] = await connection.query('SELECT * FROM alimento_venta');
    const endServer = new Date();
    const serverTime = endServer - startServer;
    const startLocal = new Date();
    await localDBConnection.query('SELECT * FROM alimento_venta');
    const endLocal = new Date();
    const localTime = endLocal - startLocal;
    await ScriptsCtr.saveResponseTime('Alimento_Venta', localTime, serverTime);
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
    res.json(rows);
};

AlimentoVentaCtr.getDataAlimento = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM alimento_venta WHERE id = ?', [
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
    const [rows] = await connection.query('SELECT COUNT(*) FROM alimento_venta');
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
    // const otherDeviceConnection = await OtherDeviceConnection();
    const [results] = await connection.query('INSERT INTO alimento_venta (Nombre, PrecioUnitario, Cantidad, TipoUnidad) VALUES (?,?,?,?)', [
        Nombre,
        PrecioUnitario,
        Cantidad,
        TipoUnidad
    ]);
    // await otherDeviceConnection.query('INSERT INTO alimento_venta (Nombre, PrecioUnitario, Cantidad, TipoUnidad) VALUES (?,?,?,?)', [
    //     Nombre,
    //     PrecioUnitario,
    //     Cantidad,
    //     TipoUnidad
    // ]);
    res.json({
        id: results.insertId,
        ...req.body,
        ok: true,
    });
};

AlimentoVentaCtr.deleteAlimento = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    // const otherDeviceConnection = await OtherDeviceConnection();
    const result = await connection.query('DELETE FROM alimento_venta WHERE id = ?', [
        id
    ]);
    // await otherDeviceConnection.query('DELETE FROM alimento_venta WHERE id = ?', [
    //     id
    // ]);
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
    // const otherDeviceConnection = await OtherDeviceConnection();
    const result = await connection.query('UPDATE alimento_venta SET ? WHERE id = ?', [
        req.body,
        id
    ]);
    // await otherDeviceConnection.query('UPDATE alimento_venta SET ? WHERE id = ?', [
    //     req.body,
    //     id
    // ]);
    res.json(result);
};

module.exports = AlimentoVentaCtr;