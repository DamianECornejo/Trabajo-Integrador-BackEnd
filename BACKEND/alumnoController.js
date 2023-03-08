require("rootpath")();
const express = require('express');
const app = express();

const AlumnoBD = require("AlumnoBD.js");
const securityCont = require("security.js");



app.get('/', securityCont.verificarToken ,getAlumnos);

app.get('/:id', securityCont.verificarToken,getByIdAlumno);

app.delete('/:id',securityCont.verificarToken , deleteAlumno);

app.post('/', securityCont.verificarToken ,createAlumno);

app.put('/:id', securityCont.verificarToken ,updateAlumno);



function getAlumnos(req, res) {
    AlumnoBD.getAlumnos(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function getByIdAlumno(req, res) {
    AlumnoBD.getByIdAlumno(req.params.id, function (err, result){
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function deleteAlumno(req, res) {
   AlumnoBD.deleteAlumno(req.params.id, function (err, result) {
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

function createAlumno(req, res) {
    AlumnoBD.createAlumno(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function updateAlumno(req, res) {
    AlumnoBD.updateAlumno(req.params.id, req.body, function (err,result) {
        if (err) {
            res.status(500).send(err);
        } else {
            if(result.details.affectedRows == 0) {
                res.status(404).json(result);
        } else {
            res.json(result);
        }
    }});
}


module.exports = app;