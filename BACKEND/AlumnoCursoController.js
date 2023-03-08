require("rootpath")();
const express = require('express');
const app = express();

const AlumnoCursoBD = require("AlumnoCursoBD.js");
const securityCont = require("security.js");



app.post('/', securityCont.verificarToken ,inscribirAlumno);
app.get('/:id_curso',securityCont.verificarToken , getAlumnosByIdCurso);

function inscribirAlumno(req, res) {
    AlumnoCursoBD.inscribirAlumno(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function getAlumnosByIdCurso(req, res) {
    AlumnoCursoBD.getAlumnosByIdCurso(req.params.id_curso, function (err, result) {
       if (err) {
          res.status(500).send(err);
       } else {
          res.json(result);
       }
    })
 }
module.exports = app;