const ComprasCtr = {};
const connect = require('../../DBConexion');

ComprasCtr.getDataCompras = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Compras');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
        res.json(rows);
};

ComprasCtr.getDataCompra = async (req, res) => {
    const id_Compra = req.params.id_Compra;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Compras WHERE id_Compra = ?', [
        id_Compra
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existe el registro de Compra con el id: ' + id_Compra,
        ok: false
    }) :
        res.json(rows);
};

ComprasCtr.getComprasCount = async (req, res) => {
    const connection = await connect();
    const result = await connection.query('SELECT * FROM Compras');
    if (result[0].length === 0) {
        res.json({
            msg: 'Sin registros de compras...',
            ok: false
        });
    } else {
        const [rows] = await connection.query('SELECT COUNT(*) FROM Compras');
        res.json({
            TotalCompras: rows[0]['COUNT(*)'],
            ok: true
        });
    }
};

ComprasCtr.createCompra = async (req, res) => {
    const id_Proveedor = req.body.id_Proveedor;
    const id_Producto = req.body.id_Producto;
    const id_Personal = req.body.id_Personal;
    const Cantidad = req.body.Cantidad;
    const Precio_Unitario = req.body.Precio_Unitario;
    const Fecha = req.body.Fecha;

    // validacion
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Proveedores WHERE id_Proveedor = ?', [
        id_Proveedor
    ]);
    if (rows.length === 0) {
        res.json({
            msg: 'No existe Proveedor con id: ' + id_Proveedor,
            ok: false
        });
    } else {
        const personal = await connection.query('SELECT * FROM Personal WHERE id = ?', [id_Personal]);
        if (personal[0].length === 0) {
            res.json({
                msg: 'Personal no identificado',
                ok: false
            });
        } else {
            const [results] = await connection.query('INSERT INTO Compras (id_Proveedor,id_Producto, id_Personal, Cantidad, Precio_Unitario, Fecha) VALUES (?,?,?,?,?,?)', [
                id_Proveedor,
                id_Producto,
                id_Personal,
                Cantidad,
                Precio_Unitario,
                Fecha
            ]);
            res.json({
                id: results.insertId,
                ...req.body
            });
        }
    }
};

// maybe no se use 
ComprasCtr.deleteCompra = async (req, res) => {
    const id_Compra = req.params.id_Compra;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Compras WHERE id_Compra = ?', [
        id_Compra
    ]);

    if (rows.length === 0) {
        res.json({
            msg: 'Compra no existente con id ' + id_Compra,
            ok: false
        });
    } else {
        const result = await connection.query('DELETE FROM Compras WHERE id_Compra = ?', [id_Compra]);
        result[0].affectedRows !== 0 ?
            res.json({
                msg: 'Compra eliminada con exito',
                ok: true
            }) :
            res.json({
                msg: 'Error al eliminar...',
                ok: false
            });
    }
};

module.exports = ComprasCtr;