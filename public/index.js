

const socket = io.connect()

function addMessage(){
    const nombre = document.getElementById('nombre').value
    const mensaje = document.getElementById('mensaje').value
    
    const nuevoMensaje = {
        nombre:nombre,
        mensaje:mensaje
    }
    
    // socket.emit('nuevo-mensaje',{nombre,mensaje})

    socket.emit('new-message',nuevoMensaje)
    return false

}

function render(data){
    const html = data.map((elem,index)=>{
        return(
            `<div>
                <strong style="color:blue ;">${elem.nombre}</strong>:
                <em style="color:green ;">${elem.mensaje}</em>
            </div>
            `
        )
    }).join(' ')

    document.getElementById('messages').innerHTML = html
}

socket.on('mensajes',function(data){
    render(data)
})


function addProduct(){
    const producto = document.getElementById('producto').value
    const precio = document.getElementById('precio').value
    const thombnail = document.getElementById('thombnail').value

    
    
    const nuevoProducto = {
        producto:producto,
        precio:precio,
        thombnail:thombnail
        
    }
    
   
    socket.emit('new-product',nuevoProducto)
    return false

}

function renderProduct(data){
    const html = data.map((elem,index)=>{
        return(
            `<div  class="container_table">
                <div class="table-responsive">
                    <table class="table table-dark">
                        <tr style="color:rgb(255, 106, 0) ;">
                            <th>producto</th>
                            <th>precio</th>
                            <th>thombnail</th>
                        </tr>
                        
                        <tr>
                            <td><strong>${elem.producto}</strong></td>
                            <td>${elem.precio}</td>
                            <td>${elem.thombnail}</td>

                            
                        </tr>
                    </table>
                </div>
            </div>
            `
        )
    }).join(' ')

    document.getElementById('product').innerHTML = html
}

socket.on('productos',function(data){
    renderProduct(data)
})



