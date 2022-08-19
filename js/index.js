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
        location.href='login.html';
    }
    else {
        document.getElementById('cerrar').style.display = 'block';
        document.getElementById('usuario').innerHTML = usuario;
    }

    
    document.getElementById("cerrar").addEventListener("click", () => {
        alert('Cierro sesion');
        sessionStorage.clear();
        location.href = 'login.html';
    });
});  

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}