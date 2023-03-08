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

var AlumnoCursoBD = {};

AlumnoCursoBD.inscribirAlumno = function (alumno_curso, funCallback) {
    
    var query = 'INSERT INTO alumno_curso (id_alumno, id_curso) VALUES (?,?)'
    var dbParams = [alumno_curso.id_alumno, alumno_curso.id_curso];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe el alumno inscripto `,
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
            funCallback( {
                message: `alumno inscripto`,
                detail: result
            });
        }
    });
}


AlumnoCursoBD.getAlumnosByIdCurso = function (id_curso, funCallBack) {
    connection.query("SELECT alumno.nombre, alumno.apellido FROM alumno_curso INNER JOIN alumno ON alumno_curso.id_alumno = alumno.id WHERE alumno_curso.id_curso = ?", id_curso, function (err, result, fields) {
       if (err) {
          funCallBack({
             message: "Surgio un problema, contactese con un administrador. Gracias!",
             detail: err
          });
          console.error(err);
       } else {
          if (result.length > 0) {
             funCallBack(undefined, result);
          } else {
             funCallBack({
                message: "No se encuentra el Curso disponible"
             })
          }
       };
    });
 
 }



module.exports = AlumnoCursoBD;