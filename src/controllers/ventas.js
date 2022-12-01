const VentasCtr = {};
const connect = require('../../DBConexion');

VentasCtr.getDataVentas = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Ventas');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
        res.json(rows);
};

VentasCtr.getDataVenta = async (req, res) => {
    const id_Venta = req.params.id_Venta;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Ventas WHERE id_Venta = ?', [
        id_Venta
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existe el registro con el id: ' + id_Venta,
        ok: false
    }) :
        res.json(rows);
};

VentasCtr.getVentasCount = async (req, res) => {
    const connection = await connect();
    const result = await connection.query('SELECT * FROM Ventas');
    if(result[0].length === 0){
        res.json({
            msg: 'Sin registros de ventas...',
            ok: false
        });
    } else {
        const [rows] = await connection.query('SELECT COUNT(*) FROM Ventas');
        res.json({
            TotalVentas: rows[0]['COUNT(*)'],
            ok: true
        });
    }
};

VentasCtr.createVenta = async (req, res) => {
    const id_Cliente = req.body.id_Cliente;
    const id_Producto = req.body.id_Producto;
    const Cantidad = req.body.Cantidad;
    const Precio = req.body.Precio;
    const Total = req.body.Total;
    const Fecha = req.body.Fecha;

    // validacion
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Clientes WHERE id_Cliente = ?',[
        id_Cliente
    ]);
    if(rows.length === 0){
        res.json({
            msg: 'No existe Cliente con id: ' + id_Cliente,
            ok: false
        });
    } else {
        const [results] = await connection.query('INSERT INTO Ventas (id_Cliente,id_Producto,Cantidad, Precio, Total, Fecha) VALUES (?,?,?,?,?,?)',[
            id_Cliente,
            id_Producto,
            Cantidad,
            Precio,
            Total,
            Fecha
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    }
};

VentasCtr.deleteVenta = async (req, res) => {
    const id_Venta = req.params.id_Venta;
    const id_Cliente = req.params.id_Cliente;
    const connection = await connect();

    const [rows] = await connection.query('SELECT * FROM Ventas WHERE id_Venta = ? AND id_Cliente = ?',[
        id_Venta,
        id_Cliente
    ]);

    if(rows.length === 0){
        res.json({
            msg: 'La venta no realizada al cliente ' + id_Cliente,
            ok: false 
        });
    } else {
        const result = await connection.query('DELETE FROM Ventas WHERE id_Venta = ?', [id_Venta]);
        result[0].affectedRows !== 0 ?
            res.json({
                msg: 'Venta eliminada con exito',
                ok: true
            }) :
            res.json({
                msg: 'Error al eliminar...',
                ok: false
            });
    }
};

module.exports = VentasCtr;