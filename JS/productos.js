function mostrarProductos() {
    let request = sendRequest('productos', 'GET', '');
    let table = document.getElementById('productos-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        console.log(data)
        data.forEach(element => {
            table.innerHTML += `
        <tr>
        
         <td>${element.Producto}</td>
         <td>${element.Porciones_peso}</td>
         <td>${element.Frutas}</td>
         <td>${element.Especiales}</td>
        
          <td>
        <button type="button" class ="btn btn-primary" onclick='window.location = "/formproductos.html?id=${element._id}"'>Editar</button> 
        <button type="button" class ="btn btn-danger" onclick='deleteProductos("${element._id}")'>Eliminar</button>
    </td>
        </tr>
        `
        });
    }
}
function deleteProductos(id) {
    let request = sendRequest('productos/' + id, 'DELETE', '')
    request.onload = function () {
        mostrarProductos();
    }
}

function guardarProductos() {
    let pro = document.getElementById('producto-p').value
    let por = document.getElementById('porciones-p').value
    let fru = document.getElementById('frutas-f').value
    let esp = document.getElementById('especiales-e').value
    let data = {
        'Producto': pro, 'Porciones_peso': por, 'Frutas': fru, 'Especiales': esp,
    }
    let request = sendRequest('productos/', 'POST', data);
    request.onload = function () {
       window.location = 'productos.html'
    }
    request.onerror = function () {
        console.log("error al guardar datos")
    }
}

function cargarDatos(id) {
    let request = sendRequest('productos/' + id, 'GET', '');
    let pro = document.getElementById('producto-p')
    let por = document.getElementById('porciones-p')
    let fru = document.getElementById('frutas-f')
    let esp = document.getElementById('especiales-e')
    request.onload = function () {
        let data = request.response;
        pro.value = data.Producto
        por.value = data.Porciones_peso
        fru.value = data.Frutas
        esp.value = data.Especiales
        
        console.log(data)

    }
    request.onerror = function () {
        console.log('error al cargar datos')
    }
}

function modificarProductos(id) {
    let pro = document.getElementById('producto-p').value
    let por = document.getElementById('porciones-p').value
    let fru = document.getElementById('frutas-f').value
    let esp = document.getElementById('especiales-e').value
    let data = {
        'Producto': pro, 'Porciones_peso': por, 'Frutas': fru, 'Especiales': esp,
        
    }
    let request = sendRequest('productos/' + id, 'PUT', data);
    request.onload = function () {
        window.location = 'productos.html'
    }
    request.onerror = function () {
        console.log("error al modificar datos")
    }
}