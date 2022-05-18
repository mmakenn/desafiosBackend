Microsoft Windows [Versión 10.0.22000.675]
(c) Microsoft Corporation. Todos los derechos reservados.

C:\Users\macmr>docker run --name mymongodb -v E:\MAC\DEV\CODERHOUSE\4-30935-programación-backend\desafios\Desafio-clase18:\data\db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=mymongodbpass -p 27017:27017 -d mongo
74239b324a61909b4481627b214075b01b349e466e6d3a189b32329137a0c28b
C:\Users\macmr>docker exec -it mymongodb bash
root@74239b324a61:/# mongosh -u root -p
Enter password: *************
Current Mongosh Log ID: 628388b5cf7295007a6b6785
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1
Using MongoDB:          5.0.8
Using Mongosh:          1.3.1

For mongosh info see: https://docs.mongodb.com/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting:
   2022-05-17T11:35:00.988+00:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
   2022-05-17T11:35:01.953+00:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never'
------

test> show databases
admin    102 kB
config  12.3 kB
local   73.7 kB
test> use desafio-clase18
switched to db desafio-clase18
desafio-clase18> db.dropDatabase()
{ ok: 1, dropped: 'desafio-clase18' }
desafio-clase18> use ecommerce
switched to db ecommerce
ecommerce> show collections

ecommerce> db.createCollection("mensajes")
{ ok: 1 }
ecommerce> db.createCollection("productos")
{ ok: 1 }
ecommerce> show collections
mensajes
productos
ecommerce> db.mensajes.insertOne({user: "Martin Perez", date: "17/05/2022 12:50", ttext: "Hola, cómo estás?"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c448a6bc3c7cd0e8daaf")
}
ecommerce> db.mensajes.insertOne({user: "Ramiro Duarte", date: "17/05/2022 12:51", text: "Hola, bien y vos?"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c486a6bc3c7cd0e8dab0")
}
ecommerce> db.mensajes.insertOne({user: "Martin Perez", date: "17/05/2022 12:51", text: "Bien, chusmeando la web"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c49fa6bc3c7cd0e8dab1")
}
ecommerce> db.mensajes.insertOne({user: "Ramiro Duarte", date: "17/05/2022 12:52", text: "Perfecto. Te puedo ayudar en algo?"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c4b9a6bc3c7cd0e8dab2")
}
ecommerce> db.mensajes.insertOne({user: "Martin Perez", date: "17/05/2022 12:53", text: "Queria saber si tienen confites porque no los encuentro"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c51ea6bc3c7cd0e8dab3")
}
ecommerce> db.mensajes.insertMany([{user: "Jesica Toren", date: "17/05/2022 12:55", text: "Hola! Soy Jesi del dpto. de ventas, te paso el link --> skdfskdf"}, {user: "Martin Perez", date: "17/05/2022 12:56", text: "Gracias, hasta luego"}, {user: "Tomas Arregui", date: "17/05/2022 12:58", text: "Hola, necesito precio mayorista"}, {user: "Ramiro Duarte", date: "17/05/2022 13:00", text: "Para ventas mayoristas comunicate directamente con mayoristas@myecommerce.com"}, {user: "Tomas Arregui", date: "17/05/2022 13:02", text: "No sabia ese medio, gracias. Agreguenlo en la web!"}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("6283c705a6bc3c7cd0e8dab4"),
    '1': ObjectId("6283c705a6bc3c7cd0e8dab5"),
    '2': ObjectId("6283c705a6bc3c7cd0e8dab6"),
    '3': ObjectId("6283c705a6bc3c7cd0e8dab7"),
    '4': ObjectId("6283c705a6bc3c7cd0e8dab8")
  }
}
ecommerce> db.mensajes.find()
[
  {
    _id: ObjectId("6283c448a6bc3c7cd0e8daaf"),
    user: 'Martin Perez',
    date: '17/05/2022 12:50',
    text: 'Hola, cómo estás?'
  },
  {
    _id: ObjectId("6283c486a6bc3c7cd0e8dab0"),
    user: 'Ramiro Duarte',
    date: '17/05/2022 12:51',
    text: 'Hola, bien y vos?'
  },
  {
    _id: ObjectId("6283c49fa6bc3c7cd0e8dab1"),
    user: 'Martin Perez',
    date: '17/05/2022 12:51',
    text: 'Bien, chusmeando la web'
  },
  {
    _id: ObjectId("6283c4b9a6bc3c7cd0e8dab2"),
    user: 'Ramiro Duarte',
    date: '17/05/2022 12:52',
    text: 'Perfecto. Te puedo ayudar en algo?'
  },
  {
    _id: ObjectId("6283c51ea6bc3c7cd0e8dab3"),
    user: 'Martin Perez',
    date: '17/05/2022 12:53',
    text: 'Queria saber si tienen confites porque no los encuentro'
  },
  {
    _id: ObjectId("6283c705a6bc3c7cd0e8dab4"),
    user: 'Jesica Toren',
    date: '17/05/2022 12:55',
    text: 'Hola! Soy Jesi del dpto. de ventas, te paso el link --> skdfskdf'
  },
  {
    _id: ObjectId("6283c705a6bc3c7cd0e8dab5"),
    user: 'Martin Perez',
    date: '17/05/2022 12:56',
    text: 'Gracias, hasta luego'
  },
  {
    _id: ObjectId("6283c705a6bc3c7cd0e8dab6"),
    user: 'Tomas Arregui',
    date: '17/05/2022 12:58',
    text: 'Hola, necesito precio mayorista'
  },
  {
    _id: ObjectId("6283c705a6bc3c7cd0e8dab7"),
    user: 'Ramiro Duarte',
    date: '17/05/2022 13:00',
    text: 'Para ventas mayoristas comunicate directamente con mayoristas@myecommerce.com'
  },
  {
    _id: ObjectId("6283c705a6bc3c7cd0e8dab8"),
    user: 'Tomas Arregui',
    date: '17/05/2022 13:02',
    text: 'No sabia ese medio, gracias. Agreguenlo en la web!'
  }
]
ecommerce> db.mensajes.estimatedDocumentCount()
10
ecommerce> db.mensajes.countDocuments({user: "Ramiro Duarte"})
3
ecommerce> db.mensajes.countDocuments({user: "Jesica Toren"})
1
ecommerce> db.mensajes.countDocuments({user: "Pepe Lopez"})
0
ecommerce> db.productos.insertOne({title: "Sugus confitados", price: 100, stock: 5648, description: "Los mejores del mundo mundial", image: "http://misugus.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c97aa6bc3c7cd0e8dab9")
}
ecommerce> db.productos.insertOne({title: "Dos corazones", price: 150, stock: 821687, description: "Riquisimo y Ricki lo sabe", image: "http://felfort.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6283c9d6a6bc3c7cd0e8daba")
}
ecommerce> db.productos.insertOne({title: "Blockazo", price: 2500, stock: 85, description: "Sin palabras", image: "http://empacho.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6283ca2aa6bc3c7cd0e8dabb")
}
ecommerce> db.productos.insertOne({title: "Caja de bombones Garoto", price: 500, stock: 565, description: "Un garotinho", image: "http://brasilponele.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6283cabca6bc3c7cd0e8dabc")
}
ecommerce> db.productos.insertOne({title: "Alfajor Terrabusi caja X6", price: 900, stock: 846, description: "", image: "http://terrabusi.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6284ce19a6bc3c7cd0e8dabd")
}
ecommerce> db.productos.insertOne({title: "Caja sorpresa Arcor", price: 4900, stock: 3156, description: "Una variedad increible de golosinas. 20 unidades", image: "http://random.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6284ce8da6bc3c7cd0e8dabe")
}
ecommerce> db.productos.insertOne({title: "Alfajor Cachafaz", price: 170, stock: 645, description: "El mejor", image: "http://cachafaz.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6284cf09a6bc3c7cd0e8dabf")
}
ecommerce> db.productos.insertOne({title: "Galletitas Oreo Bañadas", price: 859, stock: 75, description: "Vicio de los niños y no tan niños", image: "http://cariiiisimo.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6284cfafa6bc3c7cd0e8dac0")
}
ecommerce> db.productos.estimatedDocumentCount()
8
ecommerce> db.productos.insertOne({title: "Caramelos Butter Toffes menta", price: 1154, stock: 125, description: "", image: ""})
{
  acknowledged: true,
  insertedId: ObjectId("6284d014a6bc3c7cd0e8dac1")
}
ecommerce> db.productos.insertOne({title: "Chupetines Pico Dulce x12", price: 350, stock: 4125, description: "", image: ""})
{
  acknowledged: true,
  insertedId: ObjectId("6284d084a6bc3c7cd0e8dac2")
}
ecommerce> db.productos.estimatedDocumentCount()
10
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("6283c97aa6bc3c7cd0e8dab9"),
    title: 'Sugus confitados',
    price: 100,
    stock: 5648,
    description: 'Los mejores del mundo mundial',
    image: 'http://misugus.com'
  },
  {
    _id: ObjectId("6283c9d6a6bc3c7cd0e8daba"),
    title: 'Dos corazones',
    price: 150,
    stock: 821687,
    description: 'Riquisimo y Ricki lo sabe',
    image: 'http://felfort.com'
  },
  {
    _id: ObjectId("6283ca2aa6bc3c7cd0e8dabb"),
    title: 'Blockazo',
    price: 2500,
    stock: 85,
    description: 'Sin palabras',
    image: 'http://empacho.com'
  },
  {
    _id: ObjectId("6283cabca6bc3c7cd0e8dabc"),
    title: 'Caja de bombones Garoto',
    price: 500,
    stock: 565,
    description: 'Un garotinho',
    image: 'http://brasilponele.com'
  },
  {
    _id: ObjectId("6284ce19a6bc3c7cd0e8dabd"),
    title: 'Alfajor Terrabusi caja X6',
    price: 900,
    stock: 846,
    description: '',
    image: 'http://terrabusi.com'
  },
  {
    _id: ObjectId("6284ce8da6bc3c7cd0e8dabe"),
    title: 'Caja sorpresa Arcor',
    price: 4900,
    stock: 3156,
    description: 'Una variedad increible de golosinas. 20 unidades',
    image: 'http://random.com'
  },
  {
    _id: ObjectId("6284cf09a6bc3c7cd0e8dabf"),
    title: 'Alfajor Cachafaz',
    price: 170,
    stock: 645,
    description: 'El mejor',
    image: 'http://cachafaz.com'
  },
  {
    _id: ObjectId("6284cfafa6bc3c7cd0e8dac0"),
    title: 'Galletitas Oreo Bañadas',
    price: 859,
    stock: 75,
    description: 'Vicio de los niños y no tan niños',
    image: 'http://cariiiisimo.com'
  },
  {
    _id: ObjectId("6284d014a6bc3c7cd0e8dac1"),
    title: 'Caramelos Butter Toffes menta',
    price: 1154,
    stock: 125,
    description: '',
    image: ''
  },
  {
    _id: ObjectId("6284d084a6bc3c7cd0e8dac2"),
    title: 'Chupetines Pico Dulce x12',
    price: 350,
    stock: 4125,
    description: '',
    image: ''
  }
]
ecommerce> db.productos.insertOne({title: "Este lo agrego por el punto 5) CRUD", price: 2648, stock: 1, description: "Veremos...", image: ""})
{
  acknowledged: true,
  insertedId: ObjectId("6284d2a1a6bc3c7cd0e8dac3")
}
ecommerce> db.productos.find({"price": {$lt: 1000}}, {"title":1})
[
  {
    _id: ObjectId("6283c97aa6bc3c7cd0e8dab9"),
    title: 'Sugus confitados'
  },
  { _id: ObjectId("6283c9d6a6bc3c7cd0e8daba"), title: 'Dos corazones' },
  {
    _id: ObjectId("6283cabca6bc3c7cd0e8dabc"),
    title: 'Caja de bombones Garoto'
  },
  {
    _id: ObjectId("6284ce19a6bc3c7cd0e8dabd"),
    title: 'Alfajor Terrabusi caja X6'
  },
  {
    _id: ObjectId("6284cf09a6bc3c7cd0e8dabf"),
    title: 'Alfajor Cachafaz'
  },
  {
    _id: ObjectId("6284cfafa6bc3c7cd0e8dac0"),
    title: 'Galletitas Oreo Bañadas'
  },
  {
    _id: ObjectId("6284d084a6bc3c7cd0e8dac2"),
    title: 'Chupetines Pico Dulce x12'
  }
]
ecommerce> db.productos.find({"price": {$and: [{$gt: 1000}, {$lt: 3000}]}}, {"title":1})
MongoServerError: unknown operator: $and
ecommerce> db.productos.find({"price": {$gt: 1000, $lt: 3000}}, {"title":1})
[
  { _id: ObjectId("6283ca2aa6bc3c7cd0e8dabb"), title: 'Blockazo' },
  {
    _id: ObjectId("6284d014a6bc3c7cd0e8dac1"),
    title: 'Caramelos Butter Toffes menta'
  },
  {
    _id: ObjectId("6284d2a1a6bc3c7cd0e8dac3"),
    title: 'Este lo agrego por el punto 5) CRUD'
  }
]
ecommerce> db.productos.find({"price": {$gt: 3000}}, {"title":1})
[
  {
    _id: ObjectId("6284ce8da6bc3c7cd0e8dabe"),
    title: 'Caja sorpresa Arcor'
  }
]
ecommerce> db.productos.find({}, {"title": 1}).sort({"price":1}).skip(3).limit(1)
[
  {
    _id: ObjectId("6284d084a6bc3c7cd0e8dac2"),
    title: 'Chupetines Pico Dulce x12'
  }
]
ecommerce> db.productos.updateMany({}, {$set: {nuevoCampo:"Ya tenia stock"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 11,
  modifiedCount: 11,
  upsertedCount: 0
}
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("6283c97aa6bc3c7cd0e8dab9"),
    title: 'Sugus confitados',
    price: 100,
    stock: 5648,
    description: 'Los mejores del mundo mundial',
    image: 'http://misugus.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6283c9d6a6bc3c7cd0e8daba"),
    title: 'Dos corazones',
    price: 150,
    stock: 821687,
    description: 'Riquisimo y Ricki lo sabe',
    image: 'http://felfort.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6283ca2aa6bc3c7cd0e8dabb"),
    title: 'Blockazo',
    price: 2500,
    stock: 85,
    description: 'Sin palabras',
    image: 'http://empacho.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6283cabca6bc3c7cd0e8dabc"),
    title: 'Caja de bombones Garoto',
    price: 500,
    stock: 565,
    description: 'Un garotinho',
    image: 'http://brasilponele.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284ce19a6bc3c7cd0e8dabd"),
    title: 'Alfajor Terrabusi caja X6',
    price: 900,
    stock: 846,
    description: '',
    image: 'http://terrabusi.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284ce8da6bc3c7cd0e8dabe"),
    title: 'Caja sorpresa Arcor',
    price: 4900,
    stock: 3156,
    description: 'Una variedad increible de golosinas. 20 unidades',
    image: 'http://random.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284cf09a6bc3c7cd0e8dabf"),
    title: 'Alfajor Cachafaz',
    price: 170,
    stock: 645,
    description: 'El mejor',
    image: 'http://cachafaz.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284cfafa6bc3c7cd0e8dac0"),
    title: 'Galletitas Oreo Bañadas',
    price: 859,
    stock: 75,
    description: 'Vicio de los niños y no tan niños',
    image: 'http://cariiiisimo.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d014a6bc3c7cd0e8dac1"),
    title: 'Caramelos Butter Toffes menta',
    price: 1154,
    stock: 125,
    description: '',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d084a6bc3c7cd0e8dac2"),
    title: 'Chupetines Pico Dulce x12',
    price: 350,
    stock: 4125,
    description: '',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d2a1a6bc3c7cd0e8dac3"),
    title: 'Este lo agrego por el punto 5) CRUD',
    price: 2648,
    stock: 1,
    description: 'Veremos...',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  }
]
ecommerce> db.productos.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
ecommerce> db.productos.deleteMany({"price": {$lt: 1000}})
{ acknowledged: true, deletedCount: 7 }
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("6283ca2aa6bc3c7cd0e8dabb"),
    title: 'Blockazo',
    price: 2500,
    stock: 85,
    description: 'Sin palabras',
    image: 'http://empacho.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284ce8da6bc3c7cd0e8dabe"),
    title: 'Caja sorpresa Arcor',
    price: 4900,
    stock: 0,
    description: 'Una variedad increible de golosinas. 20 unidades',
    image: 'http://random.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d014a6bc3c7cd0e8dac1"),
    title: 'Caramelos Butter Toffes menta',
    price: 1154,
    stock: 125,
    description: '',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d2a1a6bc3c7cd0e8dac3"),
    title: 'Este lo agrego por el punto 5) CRUD',
    price: 2648,
    stock: 1,
    description: 'Veremos...',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  }
]
ecommerce> use admin
switched to db admin
admin> db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})
{ ok: 1 }
admin> exit
root@74239b324a61:/# mongosh -u pepe -p
Enter password: ******
Current Mongosh Log ID: 6284dda2e6d03760e613d925
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1
Using MongoDB:          5.0.8
Using Mongosh:          1.3.1

For mongosh info see: https://docs.mongodb.com/mongodb-shell/

test> show databases
ecommerce  81.9 kB
test> use ecommerce
switched to db ecommerce
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("6283ca2aa6bc3c7cd0e8dabb"),
    title: 'Blockazo',
    price: 2500,
    stock: 85,
    description: 'Sin palabras',
    image: 'http://empacho.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284ce8da6bc3c7cd0e8dabe"),
    title: 'Caja sorpresa Arcor',
    price: 4900,
    stock: 0,
    description: 'Una variedad increible de golosinas. 20 unidades',
    image: 'http://random.com',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d014a6bc3c7cd0e8dac1"),
    title: 'Caramelos Butter Toffes menta',
    price: 1154,
    stock: 125,
    description: '',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  },
  {
    _id: ObjectId("6284d2a1a6bc3c7cd0e8dac3"),
    title: 'Este lo agrego por el punto 5) CRUD',
    price: 2648,
    stock: 1,
    description: 'Veremos...',
    image: '',
    nuevoCampo: 'Ya tenia stock'
  }
]
ecommerce> db.productos.insertOne({title: "Si este entra estamos en problemas..."})
MongoServerError: not authorized on ecommerce to execute command { insert: "productos", documents: [ { title: "Si este entra estamos en problemas...", _id: ObjectId('6284de31a1996a6b8aeba87f') } ], ordered: true, lsid: { id: UUID("2dc9fc57-3f40-409d-bceb-11f3a254780b") }, $db: "ecommerce" }
ecommerce> db.productos.updateMany({}, {$set: {title:"Se rompe todo"}})
MongoServerError: not authorized on ecommerce to execute command { update: "productos", updates: [ { q: {}, u: { $set: { title: "Se rompe todo" } }, multi: true } ], ordered: true, lsid: { id: UUID("2dc9fc57-3f40-409d-bceb-11f3a254780b") }, $db: "ecommerce" }
ecommerce> exit
root@74239b324a61:/# exit
exit