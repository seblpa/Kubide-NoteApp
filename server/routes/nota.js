const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Nota = require('../models/nota');


// ===================================================
// Obtener las notas
// ===================================================
app.get('/nota', verificaToken, (req, res) => {

    Nota.find({})
        .exec((err, notas) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                notas
            });

        });

});

// ===================================================
// Obtener una nota por ID
// ===================================================
app.get('/nota/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Nota.findById(id, (err, notaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!notaDB) {

            return res.status(400).json({
                ok: false,
                err: { message: 'El ID no es correcto' }
            });
        }

        res.json({
            ok: true,
            nota: notaDB
        });

    });

});


// ===================================================
// Crear una nueva nota
// ===================================================
app.post('/nota', verificaToken, (req, res) => {

    let body = req.body;

    let nota = new Nota({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    nota.save((err, notaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!notaDB) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            nota: notaDB
        });

    });

});

// ===================================================
// Actualizar una nota
// ===================================================
app.put('/nota/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descNota = {
        descripcion: body.descripcion
    };

    Nota.findByIdAndUpdate(id, descNota, { new: true, runValidators: true }, (err, notaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!notaDB) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            nota: notaDB
        });

    });

});

// ===================================================
// Eliminar una nota
// ===================================================
app.delete('/nota/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Nota.findByIdAndRemove(id, (err, notaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!notaDB) {

            return res.status(400).json({
                ok: false,
                err: { message: 'El id no existe' }
            });
        }

        res.json({
            ok: true,
            message: 'Nota borrada'
        });

    });

});

module.exports = app;