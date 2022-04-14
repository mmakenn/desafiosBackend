const contenedor = require("./contenedor");

async function testing(){
    const archivoProductos = new contenedor.Contenedor("productos.txt");
    
    console.log('Al principio tenemos: \n');
    const inicial = await archivoProductos.getAll();
    console.log(inicial);
    
    const lapiz = {                                                                                                                                               
        title: 'Lapiz',                                                                                                                                
        price: 52.10,                                                                                                                                     
        thumbnail: 'https://cdn0.iconfinder.com/data/icons/education-794/512/Pencil-512.png',                                                                                                                                            
        }
    const idLapiz = await archivoProductos.save(lapiz);
    console.log(`Guardo un lapiz, su ID es: ${idLapiz}`);
    console.log('Vemos que se agregó: \n');
    const guardado = await archivoProductos.getAll();
    console.log(guardado);
    
    const calculador = {                                                                                                                                               
        title: 'Calculadora',                                                                                                                                
        price: 254.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                                                                                                                            
        };
    const escuadra = {                                                                                                                                               
        title: 'Escuadra',                                                                                                                                
        price: 123.45,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                                                                                                                            
        };
    const globo = {                                                                                                                                               
        title: 'Globo terráqueo',                                                                                                                                
        price: 534.87,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                            
        };
    const idCalculador = await archivoProductos.save(calculador);
    console.log(`Guardo una calculadora, su ID es: ${idCalculador}`);
    const idEscuadra = await archivoProductos.save(escuadra);
    console.log(`Guardo una escuadra, su ID es: ${idEscuadra}`);
    const idGlobo = await archivoProductos.save(globo);
    console.log(`Guardo un globo terráqueo, su ID es: ${idGlobo}`);

    console.log('Busco Calculadora por ID = 2: \n');
    const calculadora = await archivoProductos.getById(2);
    console.log(calculadora);
    console.log('Veo que no hay nada con ID = 6: \n');
    const ninguno = await archivoProductos.getById(6);
    console.log(ninguno);
    console.log('Elimino Calculadora por ID = 2: \n');
    await archivoProductos.deleteById(2);
    console.log('Muestro que se eliminó: \n');
    const eliminacion = await archivoProductos.getAll();
    console.log(eliminacion);
    console.log('Elimino todo el archivo: \n');
    await archivoProductos.deleteAll();
    const final = await archivoProductos.getAll();
    console.log(final);
}

testing();