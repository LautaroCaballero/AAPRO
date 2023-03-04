let nombre = document.getElementById('nombre')

const darNombre = () => {
    let nombreIngresado = prompt('Por favor introduzca su nombre: ')

    if(nombreIngresado === null || nombreIngresado === '') {
        prompt('Por favor introduzca su nombre: ')
        
    darNombre()
    }
    else {
        nombre.innerHTML = nombreIngresado
    }
}
document.addEventListener('DOMContentLoaded', () => {
    darNombre()
})
