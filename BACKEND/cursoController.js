require("rootpath")();
const express = require('express');
const app = express();

const cursoBD = require("cursoBD.js");
const securityCont = require("security.js");





app.get('/', securityCont.verificarToken ,getCurso);

app.delete('/:id',securityCont.verificarToken , deleteCurso);

app.post('/', securityCont.verificarToken ,createCurso);

app.put('/:id', securityCont.verificarToken ,updateCurso);





function getCurso(req, res) {
    cursoBD.getCurso(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function deleteCurso(req, res) {
   cursoBD.deleteCurso(req.params.id, function (err, result) {
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

function createCurso(req, res) {
    cursoBD.createCurso(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function updateCurso(req, res) {
    cursoBD.updateCurso(req.params.id, req.body, function (err,result) {
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