const socket = io();

const newProductForm = document.getElementById('newProductForm')
newProductForm.addEventListener('submit', e => {
    console.log("El cliente envio el form");
    e.preventDefault()

    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    socket.emit('update', product);

    newProductForm.reset()
})



socket.on('showProducts', showProducts);

function checkProductsExists(products){
    return (products.length > 0);
}

async function showProducts(products) {
    console.log("Se actualiza la tabla.");
    const template = await fetch('templates/productList.hdb');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const productsExists = checkProductsExists(products);
    const html = functionTemplate({ headers: [{title: "Producto"}, {title: "Precio"}, {title: "Imagen"}],
                                    products: products,
                                    productsExists: productsExists });
    document.getElementById('tableContainer').innerHTML = html;
}