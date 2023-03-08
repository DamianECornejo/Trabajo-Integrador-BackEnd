require("rootpath")();
const express = require('express');
const morgan = require('morgan');
const app = express();
const config = require('config.json');
var cors = require('cors');

// Dependencias

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
//Permiso




const alumnoCont = require("alumnoController.js");
app.use("/api/alumno",alumnoCont);

const cursoCont = require("cursoController.js");
app.use("/api/curso",cursoCont);

const alumno_cursoCont = require("AlumnoCursoController.js");
app.use("/api/alumno_curso",alumno_cursoCont);

const usuarioCont = require("UsuarioController.js");
app.use("/api/usuario",usuarioCont);

const securityCont = require("security.js");
app.use("/api/security",securityCont.app);



app.listen(config.server.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server iniciado en puerto:${config.server.port}`);
    }
});

//Indica el puerto que esta utilizando
