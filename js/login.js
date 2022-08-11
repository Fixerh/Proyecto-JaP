function login () {
    let usuario = document.getElementById('username').value;
    let clave = document.getElementById('clave').value;

    if (usuario ==="") {
        alert ("debe ingresar usuario");
    }
    if (clave ==="") {
        alert ("debe ingresar clave");
    }
    else {
        location.href='index.html';
    }


}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })
})