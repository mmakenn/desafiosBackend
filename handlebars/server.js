const express = require('express');
const router = require('./routers/routerProductos');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', router);

const handlebarsConfig = {
    extname: '.hdb',
    defaultLayout: 'index.hdb'
}
  
app.engine('.hdb', handlebars.engine(handlebarsConfig));
app.set('view engine', '.hdb');
app.set('views', './views')

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));