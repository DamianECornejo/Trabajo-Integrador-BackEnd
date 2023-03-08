const mysql = require('mysql');
const config = require("config.json");
const bcrypt= require('bcrypt');

//conectarnos a nuestra DB
var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Conectada correctamente");
    }
});
//fin de conexion db

var UsuarioBD = {};

UsuarioBD.create = function (usuario, funCallback) {
    let passwordHashed = bcrypt.hashSync(usuario.password,10);
    var query = 'INSERT INTO usuario (email,nickname,password,rol) VALUES (?,?,?,?)'
    var dbParams = [usuario.email, usuario.nickname, passwordHashed,usuario.rol];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe el usuario ${usuario.nickname}`,
                    detail: err
                });
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: err
                });
            }

            console.error(err);
        } else {
            funCallback(undefined, {
                message: `Se creo el usuario ${usuario.nickname}`,
                detail: result
            });
        }
    });
}

UsuarioBD.findByNickname = function (nickname,funCallback) {
    connection.query("SELECT * FROM usuario WHERE nickname=?",[nickname], function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.length>0){
                funCallback(undefined, result[0]);
            }else{
                funCallback({
                    message: "No se encontro el usuario"
                });
            }

        }
    });
}

module.exports = UsuarioBD;
