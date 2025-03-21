document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function cargarProductos() {
    try {
        const productos = [
            { id: 1, nombre: "Pantalón", precio: 25000, imagen: "./img/pantalon.jpg" },
            { id: 2, nombre: "Remera", precio: 15000, imagen: "./img/remera.jpg" },
            { id: 3, nombre: "Campera", precio: 95000, imagen: "./img/campera.jpg" }
        ];
        mostrarProductos(productos);
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
}

function mostrarProductos(productos) {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio}</p>
                    <label for="cantidad-${producto.id}" class="form-label">Cantidad:</label>
                    <input type="number" id="cantidad-${producto.id}" class="form-control mb-2" value="1" min="1">
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosDiv.appendChild(div);
    });
}

function agregarAlCarrito(id, nombre, precio, imagen) {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (isNaN(cantidad) || cantidad < 1) {
        Swal.fire("Error", "Cantidad no válida", "error");
        return;
    }

    let carrito = obtenerCarrito();
    let producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }
    guardarCarrito(carrito);
    Swal.fire("Añadido", "El producto se agregó al carrito", "success");
}