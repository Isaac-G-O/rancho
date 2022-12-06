const ScriptsCtr = {};
const connect = require('../../DBConexion');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const SECRET_KEY = 'always4youbb3312'; // <- pasar a las variables de entorno
const SECRET_KEY = process.env.SECRET_KEY; // descomentar esta linea y comentar la anterior

// login
ScriptsCtr.validarUsuario = async (req, res) => {
    console.log(req.body);
    const Cuenta = req.body.Cuenta.user;
    const Contra = req.body.Contra.pass;
    const connection = await connect();
    console.log("Cuenta: " + Cuenta);
    console.log("Contra: " + Contra)
    // validar si existe
    const user = await connection.query('SELECT * FROM personal WHERE Cuenta = ?',[Cuenta]);
    if(user[0].length === 0){
        res.json({
            msg: 'Usuario no identificado',
            ok: false
        });
    } else {
        const contraPersonal = user[0][0].Contra;
        const validarPass = bcrypt.compareSync(Contra, contraPersonal);
        if (validarPass) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
            const dataUser = {
                nombre: user[0][0].Nombre,
                cuenta: user[0][0].Cuenta,
                id: user[0][0].id,
                puesto: user[0][0].Puesto,
                accessToken: accessToken,
                expiresIn: expiresIn,
                ok: true
            }
            res.status(200).json(dataUser);
        } else {
            // password wrong
            res.status(409).send({
                msg: 'Algo anda mal',
                err: 'Nomina o Contraseña incorrecta',
                ok: false
            });
        }
    }
};

ScriptsCtr.query1 = async (req, res) => {
    const connection = await connect();

    const [data] = await connection.query('SELECT clientes.Nombre, COUNT(clientes.id_Cliente) AS NumberoVentasCliente FROM ventas LEFT JOIN clientes ON ventas.id_Cliente = clientes.id_Cliente GROUP BY Nombre');
    console.log(data);

    res.send({
        data: data,
        ok: "true"
    });
};

ScriptsCtr.query2 = async (req, res) => {
    const connection = await connect();

    const [data] = await connection.query('SELECT id_Compra, SUM(Cantidad), SUM(Precio_Unitario*Cantidad) AS total FROM compras GROUP BY id_compra HAVING total > 1000;');
    console.log(data);

    res.send({
        data: data,
        ok: "true"
    });
};

ScriptsCtr.query3 = async (req, res) => {
    const connection = await connect();

    const [data] = await connection.query('SELECT COUNT(DISTINCT id_tipo_Animal) FROM animales;');
    console.log(data);

    res.send({
        data: data,
        ok: "true"
    });
};

ScriptsCtr.query4 = async (req, res) => {
    const connection = await connect();

    const [data] = await connection.query('SELECT MAX(Precio) AS PrecioMaximo FROM ventas;');
    console.log(data);

    res.send({
        data: data,
        ok: "true"
    });
};

ScriptsCtr.query5 = async (req, res) => {
    const connection = await connect();

    const [data] = await connection.query('SELECT MIN(Precio_Unitario) AS PrecioMenor FROM compras;');
    console.log(data);

    res.send({
        data: data,
        ok: "true"
    });
};

module.exports = ScriptsCtr;