class Usuario {
    constructor (nombre, apellido, libro = null, mascota = null){
        /* 
        nombre & apellido --> String.
        libros --> Object[].
        mascotas --> String[].
         */
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        if (libro != null){
            this.libros.push(libro);
        }
        this.mascotas = [];
        if (mascota != null){
            this.mascotas.push(mascota);
        }
    }

    getFullName() {
        return (`${this.nombre} ${this.apellido}`);
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push( 
            {nombre: nombre,
            autor: autor} );
    }

    getBooksNames() {
        let names = [];
        this.libros.forEach(libro => {
            names.push(libro.nombre);
        }
        );
        return names;
    }
}


/* Inicia solo con Nombre y Apellido. */
const usuario1 = new Usuario("Macarena Soledad", "Meldi Roch");

console.log(usuario1.getFullName());
console.log(usuario1.getBooksNames());
console.log(usuario1.countMascotas());

usuario1.addBook("Perfectos Mentirosos", "Alex Mirez");
usuario1.addMascota("Apolo");

console.log(usuario1.getFullName());
console.log(usuario1.getBooksNames());
console.log(usuario1.countMascotas());

/* Inicia con todos los atributos. */
const miLibro = {nombre: "Robinson Crusoe", 
                autor: "Daniel Defoe"};
const usuario2 = new Usuario("Melina Soledad", "Meldi Roch", miLibro, "Bubu");

console.log(usuario2.getFullName());
console.log(usuario2.getBooksNames());
console.log(usuario2.countMascotas());

usuario2.addBook("Cien años de soledad", "Gabriel Garcia Marquez");
usuario2.addMascota("Kira");

console.log(usuario2.getFullName());
console.log(usuario2.getBooksNames());
console.log(usuario2.countMascotas());