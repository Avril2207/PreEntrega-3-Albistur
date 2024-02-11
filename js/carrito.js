//VARIABLES DOM
const carritoMostrar = document.querySelector(".icon-cart")
const containerCartProducts = document.querySelector(".container-cart-products")
const listaProductos = document.getElementById("seccion_productos");
const productosEnCarrito = document.querySelector('.row-product')
const productosDisponibles = JSON.parse(localStorage.getItem("productos"));
let totalAPagar = document.getElementById('total-pagar');
const CARRITO = []; 


//FUNCIONES-----------------------------------------------

//PARA SUMAR EL TOTAL-------------------------------------
const sumarTotal = () =>{
    let carritoJSON = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    carritoJSON.forEach(producto => {
        let precio = parseInt(producto.precio.slice(1));
        total += precio; 
    });
    totalAPagar.innerText = `$${total}`;
}

//PARA AGREGAR ELEMENTOS AL CARRITO--------------------------------------------------------------
const agregarAlCarrito = () =>{
    productosEnCarrito.innerHTML = ""; //para limpiar el HTML

        CARRITO.forEach(producto => {
        let containerProduct = document.createElement('div');//para crear un div con cada elemento nuevo en el carrito
        containerProduct.classList.add('productos-carrito')

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="nombre-producto-carrito">${ producto.nombre}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon-close"
            id = ${producto.id}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    `
    productosEnCarrito.append(containerProduct);
    localStorage.setItem('carrito', JSON.stringify(CARRITO));
    sumarTotal()
    });
};
//PARA ELIMINAR PRODUCTO DEL CARRITO------------------------------------------------
const eliminarProducto = (productoId) => { // Recibe el ID del producto a eliminar
    let carritoJSON = JSON.parse(localStorage.getItem("carrito"));
    const index = carritoJSON.findIndex(item => item.id === productoId);
    if (index !== -1) {
        carritoJSON.splice(index, 1);
        CARRITO.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carritoJSON));
        agregarAlCarrito()
        sumarTotal(); 
    }
};

//FIN DE LAS FUNCIONES //////////////////////////////////////////////////////////////

//Para mostrar el carrito
carritoMostrar.addEventListener('click', ()=>{//para mostrar y esconder el carrito
    containerCartProducts.classList.toggle("hidden-cart")
});
//////////////////////////////////////////////////////////////////////////
//para que c/vez que se agrege un producto este aparezca en el carrito
listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('card-boton')){
        const producto = e.target.parentElement;
        const infoProducto = {
            cantidad: 1,
            nombre: producto.querySelector('p').textContent,
            precio: producto.querySelector('h1').textContent,
            id: producto.querySelector('button').id
        };

        CARRITO.push(infoProducto);
        agregarAlCarrito();
    }
})
////////////////////////////////////////////////////////////////////////

//Para eliminar producto
productosEnCarrito.addEventListener('click', (e)=>{
    if (e.target.classList.contains('icon-close')){
        const productoElementoPadre = e.target.parentElement
        const productoAEliminar = productoElementoPadre.querySelector('svg').id
        eliminarProducto(productoAEliminar);
        
    };
})

