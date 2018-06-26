const express = require('express');

const app = express();


// ===================================================
// Obtener la Home
// ===================================================
app.get('/', (req, res, next) => {
    res.json('Home Kubide');
});



// conexión en localhost:3000 
app.listen(3000, () => {
    console.log('Escuchando peticiones en puerto: ', 3000);
});