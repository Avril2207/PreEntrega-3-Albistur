
let productosHTML = document.getElementById("container_productos")

//USO DEL FETCH PARA SIMULACIÓN  DE UNA API
fetch("productos.json")
.then(response => response.json())
.then(productos => 
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
    
})
)