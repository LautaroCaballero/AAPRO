let mainContainer = document.getElementById("main-container");
let filterContainer = document.getElementById("filtros");
let modal = document.getElementById("modal");
let modalContainer = document.getElementById("modalContainer");
let totalPago = document.getElementById("totalPago");
let totalProductos = document.getElementById("totalProductos");
let botonVaciar = document.getElementById("btn-vaciar");
let botonSumar = document.getElementById("sumarProducto");
let botonRestar = document.getElementById("restarProducto");

document.addEventListener("DOMContentLoaded", () => {
  carga();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    renderizarCarrito();
  }
});

//Carrito
let carrito = {};

//Creamos la funcion para hacer la carga principal
const carga = (filtro = "") => {
  //Hacemos la llamda al archivo JSON
  fetch("./api/productos.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //Segun el filtro se muestran una categoria de productos u otra
      switch (filtro) {
        case "camiseta":
          data
            .filter((item) => item.categoria === filtro)
            .map((item) => {
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
          break;
        case "short":
          data
            .filter((item) => item.categoria === filtro)
            .map((item) => {
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
                <button class="btn btn-success" data-id="${item.id}">Compralo ahora!</button>
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
                <button class="btn btn-success" data-id="${item.id}">Compralo ahora!</button>
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
                  <button class="btn btn-success" data-id="${item.id}">Compralo ahora!</button>
                </div>
              </div>
                </div>
                `;
          });
      }
    });
};
//Le agregamnos un evento click a la lista de filtros, con el condicional de que el 
//click se haga sobre un objeto con el tagname 'a'
filterContainer.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    //vaciamos el contenido de el contenedor principal
    mainContainer.innerHTML = "";
    //Hacemos la carga dependiendo del id que le mandemos a la funcion al hacer click
    carga(e.target.id);
  }
});
//Le agregamos un evento click al boton de agregar al carrito
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-success")) {
    //Agregamos el div completo del producto a agregar y lo pasamos a la funcion 'AgregarCarrito'
    agregarCarrito(e.target.parentElement.parentElement);
  }
});

modal.addEventListener("click", (e) => {
  //Sumar cantidad + 1
  if (e.target.classList.contains("btn-success")) {
    //Seteamos la variable producto con el carrito en el "indice" de el producto con el data-id correspondiente
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    //Luego de sumar la cantidad +1 hacemos una copia del producto mediante los {...} y se lo asignamos al
    //Carrito en el indice correspondiente
    carrito[e.target.dataset.id] = { ...producto };
    renderizarCarrito();
  }
  //restar cantidad - 1
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    carrito[e.target.dataset.id] = { ...producto };
    //Misma funcionalidad que al momento de sumar, pero si el producto llega a una cantidad de 0 se borra del carrito
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    renderizarCarrito();
  }
});

const agregarCarrito = (item) => {
  //Se crea un objeto para el producto a agregar con los elementos correspondientes
  const producto = {
    id: item.querySelector(".btn-success").dataset.id,
    nombre: item.querySelector(".card-title").innerHTML,
    precio: item.querySelector("#precio").textContent,
    cantidad: 1,
  };
  //Se crea un condicional en el cual pregunta al carrito si el producto ya existe dentro del mismo
  //hasOwnProperty se utiliza para acceder a las propiedades del objeto carrito y su key correspondiente
  //Si el producto ya existe se aumenta el producto.cantidad +1
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  // Se busca el producto correspondiente dentro del carrito y se lo sobreescribe con el nuevo producto
  carrito[producto.id] = { ...producto };
  renderizarCarrito();
};

const renderizarCarrito = () => {
  modalContainer.innerHTML = "";
  //Por cada producto dentro del carrito se renderiza un div con sus estilos especificos
  Object.values(carrito).forEach((item) => {
    modalContainer.innerHTML += `<div class=' px-4 py-3 mt-1'>
        <div class='d-flex flex-column justify-content-around'>
          <p class='fw-bold'>${item.nombre}</p>
          <div class="w-50 d-flex justify-content-evenly mx-auto">
            <p class='fw-bold'>${item.cantidad}</p>
            <button id="sumarProducto" class='btn btn-success' style='height: 35px' data-id="${
              item.id
            }">+</button>
          <button id="restarProducto" class='btn btn-danger' style='height: 35px' data-id="${
            item.id
          }">-</button>
          <p class='fw-bold text-success'>$${
            item.cantidad * parseFloat(item.precio)
          }</p>
          </div>
        </div>
    </div>`;
  });
  renderizarTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const renderizarTotal = () => {
  //Se utiliza Object.values ya que el carrito es una coleccion de objetos y por lo tanto no se puede
  //Utilizar todos los metodos de los arrays

  //Se utiliza reducer para recorrer todos los objetos, declarar el acumulador, acceder a la propiedad {cantidad}
  // y acumular la cantidad + acumulador
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

  botonVaciar.addEventListener("click", () => {
    carrito = {};
    renderizarCarrito();
  });
};
