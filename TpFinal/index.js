let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
window.addEventListener('resize', function() {
    if (window.innerWidth < 600) {
      img1.src = "./src/messiJulian.jpg";
      img2.src="./src/Messi-alternativa.jpg"
      img3.src="./src/copaAmerica.jpg"
    } else {
      img1.src = "./src/bestweb.jpg";
      img2.src = "./src/Plantel.jpg"
      img2.src = "./src/CopaMundial.webp"
    }
})

