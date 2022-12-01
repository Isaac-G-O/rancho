const ProveedoresCtr = {};
const connect = require('../../DBConexion');

ProveedoresCtr.getDataProveedores = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Proveedores');
    rows.length === 0 ? res.json({
        msg: 'No existen registros',
        ok: false
    }) :
        res.json(rows);
};

ProveedoresCtr.getDataProveedor = async (req, res) => {
    const id_Proveedor = req.params.id_Proveedor;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Proveedores WHERE id_Proveedor = ?', [
        id_Proveedor
    ]);
    rows.length === 0 ? res.json({
        msg: 'No existe el registro con el id: ' + id_Proveedor,
        ok: false
    }) : 
        res.json(rows);
};

ProveedoresCtr.getProveedoresCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM Proveedores');
    res.json({
        TotalClientes: rows[0]['COUNT(*)'],
        ok: true
    });
};

ProveedoresCtr.createProveedor = async (req, res) => {
    const id_Direccion = req.body.id_Direccion;
    const RazonSocial = req.body.RazonSocial;
    const Telefono = req.body.Telefono;
    const Correo = req.body.Correo;
    const Estatus = req.body.Estatus;
    const connection = await connect();
    
    if(await validar(id_Direccion) === 1){
        const [results] = await connection.query('INSERT INTO Proveedores (id_Direccion, RazonSocial, Telefono, Correo, Estatus) VALUES (?,?,?,?,?)', [
            id_Direccion,
            RazonSocial,
            Telefono,
            Correo,
            Estatus
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    }else{
        res.json({
            msg: 'No existe direccion: ' + id_Direccion,
            ok: false
        });
    }
};

ProveedoresCtr.deleteProveedor = async (req, res) => {
    const id_Proveedor = req.params.id_Proveedor;
    const connection = await connect();
    const result =  await connection.query('DELETE FROM Proveedores WHERE id_Proveedor = ?', [id_Proveedor]);
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

ProveedoresCtr.updateProveedor = async (req, res) => {
    const id_Proveedor = req.params.id_Proveedor;
    const connection = await connect();

    if(await validar(req.body.id_Direccion) === 1){
        const [result] = await connection.query('UPDATE Proveedores SET ? WHERE id_Proveedor = ?', [
            req.body,
            id_Proveedor
        ]);
        
        if(result.affectedRows === 0){
            res.json({
                msg: 'No existe el id_Proveedor',
                ok: false
            });
        }else{
            res.json(result);
        }
    }else{
        res.json({
            msg: 'No existe direccion: ' + req.body.id_Direccion,
            ok: false
        });
    }
};

const validar = async(id_Direccion) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM Direcciones WHERE id = ?', [
        id_Direccion
    ]);
    console.log("kajsndkfjnasd " + rows.length)
    if(rows.length === 0){
        return 0;
    }else{
        return 1;
    }


};

module.exports = ProveedoresCtr;