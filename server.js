const express = require('express')

const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./productos/contenedor')
const productos = new Contenedor("./productos.json");


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('views','./views')
app.set('view engine','ejs')



//Funciones --------------------------------------------------------

app.get('/', (req,res)=>{
    res.render('inicio', {root:__dirname})
})



app.get('/', async (req,res)=>{
    let getAll = await productos.getAll()
    console.log('Todos los archivos')
    console.log(getAll)
    if(getAll === undefined){
        
        getAll=[]
    }
    res.render('inicio',{getAll})
})


app.post('/productos', async (req,res)=>{

    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    // productos.push(req.body)
    res.redirect('/')
    console.log(productos.length)
    console.log(productos)
})

//Chat --------------------------------------------------------


const mensajes = []
const products = []


io.on('connection', socket =>{
    console.log('Usuario conectado');
    socket.emit('mensajes', mensajes)

    socket.on('new-message',data =>{
        mensajes.push(data)
        io.sockets.emit('mensajes',mensajes)
   })
})

io.on('connection', socket =>{
    socket.emit('productos', products)
    
    socket.on('new-product',dataP =>{
        products.push(dataP)
        io.sockets.emit('productos',products)
        console.log(products)
   })
   
})


const port = 8083

const server =  httpServer.listen(port,()=>{
    console.log(`Servidor escuchado en http://localhost:${port}`)
})
server.on('error',err =>{
    console.log('Error en sercvidor',err)
})




