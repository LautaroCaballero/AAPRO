let mainContainer = document.getElementById("main-container");
let filterContainer = document.getElementById("filtros")

//Creamos la funcion para hacer la carga principal
const carga = (filtro = "") => {
    //Hacemos la llamda al archivo JSON
  fetch("./api/productos.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        switch(filtro) {
            case "camiseta":
                data.filter((item) => item.categoria === filtro)
                .map(item => {
                    mainContainer.innerHTML+= 
                    `
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
                      <p>
                      ${item.precio}
                      </p>
                      <a href="#" class="btn btn-success">Compralo ahora!</a>
                    </div>
                  </div>
                    </div>
                    ` 
                })
                break
                case "short":
                    data.filter((item) => item.categoria === filtro)
                    .map(item => {
                        mainContainer.innerHTML+= 
                        `
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
                          <p>
                          ${item.precio}
                          </p>
                          <a href="#" class="btn btn-success">Compralo ahora!</a>
                        </div>
                      </div>
                        </div>
                        ` 
                    })
                    break
                    case "accesorio":
                        data.filter((item) => item.categoria === filtro)
                        .map(item => {
                            mainContainer.innerHTML+= 
                            `
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
                              <p>
                              ${item.precio}
                              </p>
                              <a href="#" class="btn btn-success">Compralo ahora!</a>
                            </div>
                          </div>
                            </div>
                            ` 
                        })
                        break
            default: 
            data.map(item => {
                mainContainer.innerHTML+= 
                `
                <div class="col mb-2">
                <div class="card col-4 mx-auto" style="width: 18rem">
                <img src="${item.imagen}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${item.nombre}</h5>
                  <div class="texto-card"> 
                    <p class="card-text" style="">
                        ${item.descripcion}
                    </p>
                  </div>
                  <p>
                  ${item.precio}
                  </p>
                  <a href="#" class="btn btn-success">Compralo ahora!</a>
                </div>
              </div>
                </div>
                ` 
            })
        }

    });
};

carga()

filterContainer.addEventListener('click', (e) => {
    if(e.target && e.target.tagName === 'A') {
        mainContainer.innerHTML = ""
        carga(e.target.id)
    }
} )

