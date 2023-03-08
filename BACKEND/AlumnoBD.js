const mysql = require('mysql');
const config = require('config.json');

var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Conectada correctamente");
    }
});

var AlumnoBD = {};

AlumnoBD.getAlumnos = function (funCallback) {
    connection.query("SELECT * FROM integrador.alumno", function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            funCallback(undefined, result);
        }
    });
}


AlumnoBD.deleteAlumno = function(id,funCallback){
    var query = 'DELETE FROM alumno WHERE id = ?'
    connection.query(query, id, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,{
                    message: `No se encontro el alumno ${id}`,
                    detail: result
                });
            } else {
                funCallback(undefined,{
                    message: `Se elimino el alumno ID N°: ${id}`,
                    detail: result
                });
            }
        }
    });
}


AlumnoBD.createAlumno = function (alumno, funCallback) {
    var query = 'INSERT INTO alumno (nombre,apellido,dni,id_usuario) VALUES (?,?,?,?)'
    var dbParams = [alumno.nombre, alumno.apellido,alumno.dni,alumno.id_usuario];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe la alumno con la ID ${alumno.dni}`,
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
                message: `Se creo la alumno ${alumno.apellido} ${alumno.nombre}`,
                detail: result
            });
        }
    });
}


AlumnoBD.updateAlumno = function (id, alumno, funCallback) {
    var query = 'UPDATE alumno SET nombre = ? , apellido = ?, dni = ? WHERE id = ?'
    var dbParams = [alumno.nombre, alumno.apellido, alumno.dni, id];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    message: `No se encontro la persona ${id}`,
                    detail: result
                });
            } else {
                funCallback({
                    message: `Se modifico la persona ${alumno.apellido} ${alumno.nombre}`,
                    detail: result
                });
            }
        }
    });

}

AlumnoBD.getByIdAlumno = function (id,funCallback) {
    connection.query("SELECT * FROM alumno WHERE id= ?" ,id, function (err, result, fields) {
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
                    message: "No se encontro el alumno/a"
                });
            }

        }
    });
}
module.exports = AlumnoBD;