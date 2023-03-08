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

var cursoBD = {};

cursoBD.getCurso = function (funCallback) {
    connection.query("SELECT * FROM curso", function (err, result, fields) {
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


cursoBD.deleteCurso = function(id,funCallback){
    var query = 'DELETE FROM curso WHERE id = ?'
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
                    message: `No se encontro el curso ${id}`,
                    detail: result
                });
            } else {
                funCallback(undefined,{
                    message: `Se elimino el curso N°: ${id}`,
                    detail: result
                });
            }
        }
    });
}


cursoBD.createCurso = function (curso, funCallback) {
    var query = 'INSERT INTO curso (nombre,descripcion,imagen,anio,activo) VALUES (?,?,?,?,?)'
    var dbParams = [curso.nombre, curso.descripcion,curso.imagen,curso.anio,curso.activo];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe la curso con la ID ${curso.id}`,
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
                message: `Se creo la curso ${curso.nombre}`,
                detail: result
            });
        }
    });
}


cursoBD.updateCurso = function (id, curso, funCallback) {
    var query = 'UPDATE curso SET nombre = ? , descripcion = ?, imagen = ?, anio = ?, activo = ? WHERE id= ?'
    var dbParams = [curso.nombre, curso.descripcion, curso.imagen,curso.anio, curso.activo, id];
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
                    message: `Se modifico la persona ${curso.descripcion} ${curso.nombre}`,
                    detail: result
                });
            }
        }
    });

}




module.exports = cursoBD;