document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";
    let carrito = obtenerCarrito();
    let total = 0;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
        document.getElementById("total").textContent = "0";
        return;
    }

    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $ ${producto.precio}</p>
                    <label for="cantidad-${producto.id}" class="form-label">Cantidad:</label>
                    <input type="number" id="cantidad-${producto.id}" class="form-control mb-2" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                    <p class="fw-bold">Subtotal: $ <span id="subtotal-${producto.id}">${subtotal}</span></p>
                    <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            </div>
        `;
        carritoDiv.appendChild(div);
    });

    document.getElementById("total").textContent = total;
}

function actualizarCantidad(index, nuevaCantidad) {
    let carrito = obtenerCarrito();
    nuevaCantidad = parseInt(nuevaCantidad);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        Swal.fire("Error", "Cantidad no válida", "error");
        mostrarCarrito();
        return;
    }

    carrito[index].cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminarán todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            mostrarCarrito();
            Swal.fire("Carrito vacío", "", "success");
        }
    });
}