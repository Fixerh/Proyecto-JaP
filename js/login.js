function login () {
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;

    if (usuario ==="" || contraseña ==="") {
        document.getElementById('usuario').classList.add('incompleto');
        document.getElementById('contraseña').classList.add('incompleto');
        alert ("debe ingresar Usuario y Contraseña ");
        
    }
    else {
        sessionStorage.setItem('usuario', usuario);
        location.href='index.html';
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })


})
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".data").css("display", "none");
        $(".g-signin2").css("display", "block");
    });
}
  