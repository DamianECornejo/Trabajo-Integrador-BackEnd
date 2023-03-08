require("rootpath")();
const express = require('express');
const app = express();

const UsuarioBD = require("UsuarioBD.js");


app.post('/' ,create);



function create(req, res) {
    UsuarioBD.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}


module.exports = app;