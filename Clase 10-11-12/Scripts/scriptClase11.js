let spanHelado = document.getElementById('spanHelado')
let spanTopping = document.getElementById('spanTopping')
let spanFinal = document.getElementById('spanFinal')

const compraHelado = (topping) => {
    let precioHelado = 30;
    let precioTopping 
    spanHelado.innerHTML = ''
    spanTopping.innerHTML = ''
    spanFinal.innerHTML = ''

    if(topping === 'oreo') {
        precioTopping = 10
        let precioFinal = precioHelado + precioTopping
        spanHelado.innerHTML = precioHelado
        spanTopping.innerHTML = precioTopping
        spanFinal.innerHTML = precioFinal
    }
    else if(topping === 'kitkat') {
        precioTopping = 15
        let precioFinal = precioHelado + precioTopping
        spanHelado.innerHTML = precioHelado
        spanTopping.innerHTML = precioTopping
        spanFinal.innerHTML = precioFinal
    }
    else if(topping === 'kinder') {
        precioTopping = 25
        let precioFinal = precioHelado + precioTopping
        spanHelado.innerHTML = precioHelado
        spanTopping.innerHTML = precioTopping
        spanFinal.innerHTML = precioFinal
    }
    else {
        spanHelado.innerHTML = precioHelado
        spanTopping.innerHTML = 'No tenemos ese topping'
        spanFinal.innerHTML = precioHelado
    }
}


//---------------------------------------------------------------
let pMenu = document.getElementById('valorMenu')
let pBebida = document.getElementById('bebida')

const seleccionMenu = (menu) => {
    pMenu.innerHTML = 'Por favor seleccione un menu'
    pBebida.innerHTML = ''
    switch(menu) {
        case 'carne': 
            pMenu.innerHTML = 'Usted ha seleccionado el menu de carne'
            pBebida.innerHTML = 'Su bebida será vino tinto'
        break
        case 'pescado': 
            pMenu.innerHTML = 'Usted ha seleccionado el menu de pescado'
            pBebida.innerHTML = 'Su bebida será vino blanco'
        break
        case 'verdura': 
            pMenu.innerHTML = 'Usted ha seleccionado el menu de verdura'
            pBebida.innerHTML = 'Su bebida será agua'
        break
        default: 
            pMenu.innerHTML = 'Por favor seleccione un menu'
            pBebida.innerHTML = ''              
    }
}

//---------------------------------------------------------------
let array = ['0', '1', '2', '3', '4', '5' ]

//Se recorre el array 

for (let i = 0; i < array.length; i++) {
    console.log('Array en la posicion: ',  array[i])
}

//Agregamos un elemento al array

array.push('6')

//Volvemos a recorrer el array

for (let i = 0; i < array.length; i++) {
    console.log('Nuevo Array en la posicion: ',  array[i])
}

//---------------------------------------------------------------
let numeroIncremental = 0

while (numeroIncremental < 11) {
    console.log('El numero ', numeroIncremental + ' es menor a 11')
    numeroIncremental ++
}