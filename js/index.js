document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener('DOMContentLoaded', ()=>{
    let usuario = sessionStorage.getItem('usuario');
    if(usuario == null){
        alert('No iniciaste sesion, porfavor iniciar sesion para continuar navegando')
        location.href='https://fixerh.github.io/Proyecto-JaP/';
    }
    else {
        document.getElementById('usuario').innerHTML = usuario;
    }

    
   
});   
