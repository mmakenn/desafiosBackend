const express = require('express');
const router = require('./routers/routerProductos');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.set('views', './views');
app.set('view engine', 'pug');

app.use('/api/productos', router);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));