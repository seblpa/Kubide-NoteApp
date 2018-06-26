const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Usuario = require('../models/usuario');


// ===================================================
// Poner un nota en favorita por usuario
// ===================================================
app.put('/favorita/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Usuario.findById(req.usuario._id, (err, usuario) => {

        if (err) {
            res.status(500).json({
                ok: false
            });
        } else {

            Usuario.favoritas.push(id);

            Usuario.save((err) => {
                if (err) {
                    res.status(500).json({
                        ok: false
                    });
                } else {
                    res.status(200).json({
                        ok: true
                    });
                }
            });
        }
    });
});

// ===================================================
// Poner un nota en favorita por id
// ===================================================
app.get('/favorita/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    Usuario.findById(req.usuario._id)
        .populate('favoritas')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario
                });
            }
        });
});


module.exports = app;