
const ActividadesCtr = {};
const connect = require('../../DBConexion');

ActividadesCtr.getActividades = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM actividades;');
    res.json(rows);
};

ActividadesCtr.getActividad = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM actividades WHERE id = ?', [id]);
    rows.length != 0 ?
        res.json({
            obj: rows[0], ok: true
        }) :
        res.json({
            msg: 'No existe registros',
            ok: false
        });
};

ActividadesCtr.getActivitiesCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM actividades');
    res.json({
        TotalActividades: rows[0]['COUNT(*)'],
        ok: true
    });
};

ActividadesCtr.saveActivity = async (req, res) => {
    const Activity = req.body.Nombre;
    const Description = req.body.Descripcion;
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO actividades(nombre, descripcion) VALUES (?,?)', [
        Activity,
        Description
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
        ok: true,
    });
}

ActividadesCtr.deleteActividad = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('DELETE FROM actividades WHERE id = ?', [id]);
    result[0].affectedRows !== 0 ?
        res.json({
            msg: 'Actividad eliminada con exito',
            ok: true
        }) :
        res.json({
            msg: 'Error al eliminar...',
            ok: false
        });
};

ActividadesCtr.updateActividad = async (req, res) => {
    const id = req.params.id;
    const connection = await connect();
    const result = await connection.query('UPDATE actividades SET ? WHERE id = ?', [
        req.body,
        id
    ]);
    res.json(result);
}; 

module.exports = ActividadesCtr;