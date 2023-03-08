const cursoCont = require("cursoController.js");
app.use("/api/curso",cursoCont);

//Datos de todos los alumnos
app.get('/api/alumno/', function (req, res) {
    BDintegrador.getAlumnos(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});


//Borrar un alumno por medio de la ID
function eliminar(req, res) {
    personaDb.delete(req.params.dni, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Agregar un nuevo alumno
app.post('/api/alumno/', function (req, res) {
    var query = 'INSERT INTO alumno (nombre,apellido,dni,id_usuario) VALUES (?,?,?,?)'
    var dbParams = [req.body.nombre, req.body.apellido, req.body.dni, req.body.id_usuario];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json({
                message: `Se creo la persona ${req.body.apellido} ${req.body.nombre}`,
                detail: result
            });
        }
    });
});
//Actualizar un alumno
app.put('/api/alumno/:id', function (req, res) {
    var query = 'UPDATE alumno SET nombre = ? , apellido = ?, dni = ? WHERE id = ?'
    var dbParams = [req.body.nombre, req.body.apellido, req.body.dni,req.params.id];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.affectedRows == 0){
                res.status(404).json({
                    message: `No se encontro la persona ${req.body.nombre}`,
                    detail: result
                });
            }else{
                res.json({
                    message: `Se modifico la persona ${req.body.apellido} ${req.body.nombre}`,
                    detail: result
                });
            }
        }
    });
});

//Datos de los cursos
app.get('/api/curso/', function (req, res) {
    connection.query("SELECT * FROM integrador.curso;", function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json(result);
        }
    });
});

//Borrar un curso por medio de la ID
app.delete('/api/curso/:id', function (req, res) {
    var query = 'DELETE FROM curso WHERE id = ?'
    connection.query(query, req.params.id, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.affectedRows == 0){
                res.status(404).json({
                    message: `No se encontro el curso ${req.body.nombre}`,
                    detail: result
                });
            }else{
                res.json({
                    message: `Se elimino el curso ${req.body.nombre}`,
                    detail: result
                });
            }
        }
    });
});

//Agregar un nuevo curso
app.post('/api/curso/', function (req, res) {
    var query = 'INSERT INTO curso (nombre,descripcion,imagen,año,activo) VALUES (?,?,?,?,?)'
    var dbParams = [req.body.nombre, req.body.descripcion, req.body.imagen, req.body.año, req.body.activo, req];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json({
                message: `Se creo el curso ${req.body.nombre}`,
                detail: result
            });
        }
    });
});
//Actualizar un nuevo curso
app.put('/api/curso/:id', function (req, res) {
    var query = 'UPDATE curso SET nombre=?,descripcion=?,imagen=?,año=?,activo=? WHERE id = ?'
    var dbParams = [req.body.nombre, req.body.descripcion, req.body.imagen, req.body.año, req.body.activo, req.params.id];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json({
                message: `Se creo el curso ${req.body.nombre}`,
                detail: result
            });
        }
    });
});
//Inscribir un alumno a un curso
app.post('/api/alumno_curso/', function (req, res) {
    var query = 'INSERT INTO alumno_curso (id_curso,id_alumno) VALUES (?,?)'
    var dbParams = [req.body.id_curso, req.body.id_alumno];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json({
                message: `Inscripciones ya realizadas`,
                detail: result
            });
        }
    });
});

//Buscar por curso todos los alumnos inscripto (sin terminar)
app.get('/api/alumno_curso/:id_curso', function (req, res) {
    connection.query("SELECT curso.nombre, alumno.nombre, alumno.apellido FROM alumno_curso INNER JOIN alumno ON alumno_curso.id_alumno=alumno.id INNER JOIN curso ON alumno_curso.id_curso = curso.id,  WHERE id_curso = ?;", function (err, result, fields) {
        if (err) {
            res.status(500).send({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            res.json(result);
        }
    });
});



personaDb.update = function (dni, persona, funCallback) {
    var query = 'UPDATE personas SET dni = ? , nombre = ?, apellido = ? WHERE dni = ?'
    var dbParams = [persona.dni, persona.nombre, persona.apellido, dni];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro la persona ${dni}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:1,
                    message: `Se modifico la persona ${persona.apellido} ${persona.nombre}`,
                    detail: result
                });
            }
        }
    });

}