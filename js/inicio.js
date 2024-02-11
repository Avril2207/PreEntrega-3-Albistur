//PARA TRAERME LOS PRODUCTOS DEL LOCAL STORAGE
const productosDisponibles = JSON.parse(localStorage.getItem("productos"));
////////////////////////////////////////////////////////////////////////////////

let productosHTML = document.getElementById("container_productos")


document.addEventListener("DOMContentLoaded", () => {
    generarProductos(productosDisponibles);
});

//para generar las targetas en el html con la info sacada del storage
const generarProductos = (productos)=>{
   
    productos.forEach(producto => {

        let card = document.createElement('div');
        card.innerHTML =`
        <div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h1 class="card-price">$${producto.precio}</h1>
          <p class="card-text">${producto.nombre}</p>
          <button class="card-boton" id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
        `
        productosHTML.appendChild(card);
        
    });

}