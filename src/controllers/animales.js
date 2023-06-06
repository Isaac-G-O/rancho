const Animales = {};
const { connect } = require('../../DBConexion');

Animales.getDataAnimales = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM animales');
    rows.length === 0 ?
        res.json({
            msg: 'No existen registros',
            ok: false
        }) :
        res.json(rows);
};

Animales.getDataAnimal = async (req, res) => {
    const id_Animal = req.params.id_Animal;
    const conneciton = await connect();
    const [rows] = await conneciton.query('SELECT * FROM animales WHERE id_Animal = ?', [
        id_Animal
    ]);
    rows.length === 0 ?
        res.json({
            msg: 'No existe el registro con el id ' + id_Animal,
            ok: false
        }) :
        res.json(rows);
};

Animales.getAnimalesCount = async (req, res) => {
    const connection = await connect();
    const result = await connection.query('SELECT * FROM animales');
    if (result[0].length === 0) {
        res.json({
            msg: 'Sin registros de Animales...',
            ok: false
        });
    } else {
        const [rows] = await connection.query('SELECT COUNT(*) FROM animales');
        res.json({
            TotalAnimales: rows[0]['COUNT(*)'],
            ok: true
        });
    }
};

Animales.createAnimal = async (req, res) => {
    const id_Tipo_Animal = req.body.id_Tipo_Animal
    const Peso = req.body.Peso;
    const Litros_Dia = req.body.Litros_Dia;
    const Litros_Total = req.body.Litros_Total;
    const Huevos_Dia = req.body.Huevos_Dia;
    const Huevos_Total = req.body.Huevos_Total;

    // validacion
    const connection = await connect();
    const tipoAnimal = await connection.query('SELECT * FROM tipo_animales WHERE id = ?', [id_Tipo_Animal]);

    if (tipoAnimal[0].length === 0) {
        res.json({
            msg: 'No existe tipo animal con id: ' + id_Tipo_Animal,
            ok: false
        });
    } else {
        const [results] = await connection.query('INSERT INTO animales (id_Tipo_Animal, Peso, Litros_Dia, Litros_Total, Huevos_Dia, Huevos_Total) VALUES (?,?,?,?,?,?)', [
            id_Tipo_Animal,
            Peso,
            Litros_Dia,
            Litros_Total,
            Huevos_Dia,
            Huevos_Total
        ]);
        res.json({
            id: results.insertId,
            ...req.body,
            ok: true
        });
    }

};

Animales.deleteAnimal = async (req, res) => {
    const id_Animal = req.params.id_Animal;
    const connection = await connect();
    const result = await connection.query('DELETE FROM animales WHERE id_Animal = ?', [id_Animal]);
    result[0].affectedRows !== 0 ?
        res.json({
            msg: 'Animal eliminado con exito',
            ok: true
        }) :
        res.json({
            msg: 'Error al eliminar...',
            ok: false
        });
};

Animales.updateAnimales = async (req, res) => {
    const id_Animal = req.params.id_Animal;
    const connection = await connect();
    const result = await connection.query('UPDATE animales SET ? WHERE id_Animal = ?', [
        req.body,
        id_Animal
    ]);
    res.json(result);
};

module.exports = Animales;