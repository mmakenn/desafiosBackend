const socket = io();

//--------------------------------------------
// Manejadores del formulario de ingreso del producto.
const newProductForm = document.getElementById('newProductForm');
newProductForm.addEventListener('submit', e => {
    console.log("El cliente envio el form");
    e.preventDefault()

    const product = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value,
        stock: parseInt(document.getElementById('price').value)
    }

    socket.emit('update', product);

    newProductForm.reset();
});

//--------------------------------------------
// Manejadores del renderizado de productos.
socket.on('showProducts', showProducts);

function checkProductsExists(products){
    return true;
}

async function showProducts(products) {
    console.log("Se actualiza la tabla.");
    const template = await fetch('templates/productList.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const productsExists = checkProductsExists(products);
    const html = functionTemplate({ headers: [{title: "Producto"}, {title: "Precio"}, {title: "Imagen"}, {title: "Stock"}],
                                    products: products,
                                    productsExists: productsExists });
    document.getElementById('tableContainer').innerHTML = html;
}

//--------------------------------------------
// Manejadores del formulario de ingreso del mensaje al chat.
let idMsg = 1
const newMessageForm = document.getElementById('newMessageForm')
newMessageForm.addEventListener('submit', e => {
    console.log("El cliente envio un mensaje.");
    e.preventDefault()

    const birthday = document.getElementById('birthday').value;
    const today = new Date();
    const message = { 
        id: String(idMsg),
        author: {
            id: document.getElementById('user').value, 
            nombre: document.getElementById('name').value, 
            apellido: document.getElementById('lastname').value, 
            edad: today.getFullYear() - parseInt(birthday.slice(0, 4)), 
            alias: document.getElementById('nickname').value,
            avatar: document.getElementById('avatar').value
        },
        date: today.toLocaleString(),
        text: document.getElementById('msg').value
    }
    
    idMsg++; 
    socket.emit('updateChat', message);
})

//--------------------------------------------
// Manejadores del renderizado de mensajes del chat.
socket.on('showChat', showChat);

async function showChat(messages) {
    console.log("Se actualiza el chat.");
    const template = await fetch('templates/chat.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ messages: messages });
    document.getElementById('chatContainer').innerHTML = html;
}