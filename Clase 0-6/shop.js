let mainContainer = document.getElementById("main-container");
let filterContainer = document.getElementById("filtros");
let modal = document.getElementById("modal");
let modalContainer = document.getElementById("modalContainer");
let totalPago = document.getElementById("totalPago");
let totalProductos = document.getElementById("totalProductos");
let botonVaciar = document.getElementById("btn-vaciar");
let botonSumar = document.getElementById("sumarProducto")
let botonRestar = document.getElementById("restarProducto")

document.addEventListener('DOMContentLoaded', () => {
  carga()
  if(localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    renderizarCarrito()
  }
})

//Carrito
let carrito = {};


//Creamos la funcion para hacer la carga principal
const carga = (filtro = "") => {
  //Hacemos la llamda al archivo JSON
  fetch("./api/productos.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      switch (filtro) {
        case "camiseta":
          data
            .filter((item) => item.categoria === filtro)
            .map((item) => {
              mainContainer.innerHTML += `
                    <div class="col">
                    <div class="card col-4 mx-auto" style="width: 18rem">
                    <img src="${item.imagen}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">${item.nombre}</h5>
                      <div class="texto-card"> 
                        <p class="card-text" style="">
                            ${item.descripcion}
                        </p>
                      </div>
                      <p id="precio">${item.precio}</p>
                      <a href="#" class="btn btn-success" data-id="${item.id}>Compralo ahora!</a>
                    </div>
                  </div>
                    </div>
                    `;
            });
          break;
        case "short":
          data
            .filter((item) => item.categoria === filtro)
            .map((item) => {
              mainContainer.innerHTML += `
                        <div class="col">
                        <div class="card col-4 mx-auto" style="width: 18rem">
                        <img src="${item.imagen}" class="card-img-top" alt="..." />
                        <div class="card-body">
                        <div class="nombre-card">
                            <h5 class="card-title">${item.nombre}</h5>
                        </div>
                          <div class="texto-card"> 
                            <p class="card-text" style="">
                                ${item.descripcion}
                            </p>
                          </div>
                          <p id="precio">${item.precio}</p>
                          <a href="#" class="btn btn-success" data-id="${item.id}>Compralo ahora!</a>
                        </div>
                      </div>
                        </div>
                        `;
            });
          break;
        case "accesorio":
          data
            .filter((item) => item.categoria === filtro)
            .map((item) => {
              mainContainer.innerHTML += `
                            <div class="col">
                            <div class="card col-4 mx-auto" style="width: 18rem">
                            <img src="${item.imagen}" class="card-img-top" alt="..." />
                            <div class="card-body">
                              <h5 class="card-title">${item.nombre}</h5>
                              <div class="texto-card"> 
                                <p class="card-text" style="">
                                    ${item.descripcion}
                                </p>
                              </div>
                              <p id="precio">${item.precio}</p>
                              <a href="#" class="btn btn-success" data-id="${item.id}>Compralo ahora!</a>
                            </div>
                          </div>
                            </div>
                            `;
            });
          break;
        default:
          data.map((item) => {
            mainContainer.innerHTML += `
                <div class="col mb-2">
                <div class="card col-4 mx-auto mb-3" style="width: 18rem">
                <img src="${item.imagen}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${item.nombre}</h5>
                  <div class="texto-card"> 
                    <p class="card-text" style="">
                        ${item.descripcion}
                    </p>
                  </div>
                  <p id="precio">${item.precio}</p>
                  <a href="#" class="btn btn-success" data-id="${item.id}">Compralo ahora!</a>
                </div>
              </div>
                </div>
                `;
          });
      }
    });
};

filterContainer.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    mainContainer.innerHTML = "";
    carga(e.target.id);
  }
});

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-success")) {
    agregarCarrito(e.target.parentElement.parentElement);
  }
});

modal.addEventListener('click', (e) => {
  //Sumar cantidad + 1
  if(e.target.classList.contains('btn-success')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad ++
    carrito[e.target.dataset.id] = {...producto}
    renderizarCarrito()
  }
  //restar cantidad - 1
  if(e.target.classList.contains('btn-danger')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad --
    carrito[e.target.dataset.id] = {...producto}
    if(producto.cantidad === 0) {
      delete carrito[e.target.dataset.id]
    }
    renderizarCarrito()
  }
})

const agregarCarrito = (item) => {
  const producto = {
    id: item.querySelector(".btn-success").dataset.id,
    nombre: item.querySelector(".card-title").innerHTML,
    precio: item.querySelector("#precio").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  renderizarCarrito();
};
const renderizarCarrito = () => {
  modalContainer.innerHTML = "";
  Object.values(carrito).forEach((item) => {
    modalContainer.innerHTML += `<div class=' px-4 mt-1'>
        <div class='modal-content d-flex justify-content-between bg-light px-4 mb-2'>
          <p>${item.nombre}</p>
          <div class="d-flex justify-content-between">
          <p>${item.cantidad}</p>
          <button id="sumarProducto" class='btn btn-success' style='height: 35px' data-id="${
            item.id
          }">+</button>
          <button id="restarProducto" class='btn btn-danger' style='height: 35px' data-id="${
            item.id
          }">-</button>
          <p>${item.cantidad * parseFloat(item.precio)}</p>
          </div>
        </div>
    </div>`;
  });
  renderizarTotal();
  localStorage.setItem('carrito', JSON.stringify(carrito))
};

const renderizarTotal = () => {
  const cantidadtotal = Object.values(carrito).reduce(
    (acumulador, { cantidad }) => acumulador + cantidad,
    0
  );
  const precioTotal = Object.values(carrito).reduce(
    (acumulador, { cantidad, precio }) =>
      acumulador + cantidad * parseFloat(precio),
    0
  );

  totalProductos.innerHTML = cantidadtotal;
  totalPago.innerHTML = precioTotal;

  botonVaciar.addEventListener('click', () => {
    carrito = {}
    renderizarCarrito()
  })
};


