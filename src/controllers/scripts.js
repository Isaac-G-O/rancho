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

module.exports = ScriptsCtr;