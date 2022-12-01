const TipoAnimales = {};
const connect = require('../../DBConexion');

TipoAnimales.getDataTipoAnimales = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Tipo_Animales');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
        res.json(rows);
};

TipoAnimales.getDataTipoAnimal = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Tipo_Animales WHERE id = ?', [
        id
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existe el registro con el id: ' + id,
        ok: false
    }) :
        res.json(rows);
};

TipoAnimales.getTipoAnimalesCount = async (req, res) => {
    const connection = await connect();
    const result = await connection.query('SELECT * FROM Tipo_Animales');
    if (result[0].length === 0) {
        res.json({
            msg: 'Sin registros de Tipo Animales...',
            ok: false
        });
    } else {
        const [rows] = await connection.query('SELECT COUNT(*) FROM Tipo_Animales');
        res.json({
            TotalTipoAnimales: rows[0]['COUNT(*)'],
            ok: true
        });
    }
};

TipoAnimales.createTipoAnimal = async (req, res) => {
    const id_Alimento = req.body.id_Alimento;
    const id_Alimento_Venta = req.body.id_Alimento_Venta;
    const id_Personal = req.body.id_Personal;
    const Nombre = req.body.Nombre;
    const Cantidad = req.body.Cantidad;
    const Precio = req.body.Precio;
    const Comida = req.body.Comida;

    // validacion
    const connection = await connect();
    const alimento = await connection.query('SELECT * FROM Alimento_Animal WHERE id = ?', [id_Alimento]);

    if (alimento[0].length === 0) {
        res.json({
            msg: 'No existe alimento animal con id: ' + id_Alimento,
            ok: false
        });
    } else {
        const alimentoVenta = await connection.query('SELECT * FROM Alimento_Venta WHERE id = ?', [id_Alimento_Venta]);
        if (alimentoVenta[0].length === 0) {
            res.json({
                msg: 'No existe alimento venta con id: ' + id_Alimento_Venta,
                ok: false
            });
        } else {
            const personal = await connection.query('SELECT * FROM Personal WHERE id = ?', [id_Personal]);
            if (personal[0].length === 0) {
                res.json({
                    msg: 'No existe el personal con id: ' + id_Personal,
                    ok: false
                });
            } else {
                const [results] = await connection.query('INSERT INTO Tipo_Animales (id_Alimento, id_Alimento_Venta, id_Personal, Nombre, Cantidad, Precio, Comida) VALUES (?,?,?,?,?,?,?)', [
                    id_Alimento,
                    id_Alimento_Venta,
                    id_Personal,
                    Nombre,
                    Cantidad,
                    Precio,
                    Comida
                ]);
                res.json({
                    id: results.insertId,
                    ...req.body
                });
            }
        }
    }
};

TipoAnimales.deleteTipoAnimal = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('DELETE FROM Tipo_Animales WHERE id = ?', [id]);
    result[0].affectedRows !== 0 ?
        res.json({
            msg: 'Tipo Animal eliminado con exito',
            ok: true
        }) :
        res.json({
            msg: 'Error al eliminar...',
            ok: false
        });
};

TipoAnimales.updateTipoAnimal = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('UPDATE Tipo_Animales SET ? WHERE id = ?', [
        req.body,
        id
    ]);
    res.json(result);
};

module.exports = TipoAnimales;