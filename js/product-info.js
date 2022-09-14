const PROD_ID= localStorage.getItem('prodID');
let items = PRODUCT_INFO_URL + PROD_ID + EXT_TYPE;
let comentarios = PRODUCT_INFO_COMMENTS_URL + PROD_ID + EXT_TYPE;
let infoProductos = [];
let infoComentarios =[];
let fecha = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

    function mostrarImagenes(infoProductos) {
        let htmlContentToAppend = "";
            htmlContentToAppend +=`
            <div class="carousel-item active">
            <img src="${infoProductos.images[0]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[1]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[2]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[3]}" class="d-block w-40">
            </div>` 
        document.getElementById('mostrar').innerHTML = htmlContentToAppend;
    }

    function puntaje(array){
        let puntos = "";
    
        for(let i=1; i <= 5; i++){
            if(i <= array){
                puntos += `<i class="fas fa-star" id= 'estrellas'></i>`;
            }
            else{
                puntos +=`<i class="far fa-star"></i>`;
            }
        }
        return puntos;
    }

    function infoDelProducto(infoProductos){
        let pNombreHTML = document.getElementById('nombre'); 
        pNombreHTML.innerHTML = infoProductos.name;
        let pDescripcionHTML = document.getElementById('descripcion'); 
        pDescripcionHTML.innerHTML = infoProductos.description;
        let soldCountHTML = document.getElementById('vendidos'); 
        soldCountHTML.innerHTML = infoProductos.soldCount;
        let precioMonedaHTML = document.getElementById('precio'); 
        precioMonedaHTML.innerHTML = infoProductos.currency + ' ' + infoProductos.cost;
        let categoryHTML = document.getElementById('categoria'); 
        categoryHTML.innerHTML = infoProductos.category;
    
    }

    function mostrarComentarios(infoComentarios){
        let comento = "";

    for (let i = 0; i < infoComentarios.length; i++){
        let comentan = infoComentarios[i];
        
        comento += `<div class= "card p-3 bg-white col-md-4 w-auto h-auto">
        <div class="d-flex flex-start align-items-center">
            <div class="user d-flex flex-row align-items-center">
                <span><medium class="font-weight-bold text-primary">${comentan.user}</medium><br> 
                <p class="font-weight-bold">${comentan.description}</p></span>
            </div>
        </div>
        <div class="action d-flex justify-content-between mt-2 align-items-center">
            ${comentan.dateTime}
        </div>
        <div class="icons position-absolute bottom-0 end-0">
                ${puntaje(comentan.score)}
                </div>
            </div>`

        document.getElementById('comentarios').innerHTML = comento;
    }
}

function nuevoComentario() {

    let comentarioNuevo = document.getElementById("comentario").value;
    let estrellasNuevas = document.getElementById('puntajeComentario').value;
    
    let nuevoComment =
    `<div class= "card p-3 bg-white col-md-4 w-auto h-auto">
    <div class="d-flex flex-start align-items-center">
        <div class="user d-flex flex-row align-items-center">
            <span><medium class="font-weight-bold text-primary">${sessionStorage.getItem('usuario')}</medium><br> 
            <p class="font-weight-bold">${comentarioNuevo}</p></span>
        </div>
    </div>
    <div class="action d-flex justify-content-between mt-2 align-items-center" id='miFecha'>
            ${fecha}
    </div>
    <div class="icons position-absolute bottom-0 end-0">
            ${puntaje(estrellasNuevas)}
            </div>
        </div>`

    document.getElementById("comentarios").innerHTML += nuevoComment;
};

document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(items).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoProductos = resultObj.data;
            mostrarImagenes(infoProductos);
            infoDelProducto(infoProductos);
            
        }
        let usuario = sessionStorage.getItem('usuario');
        if(usuario == null){
        alert('No iniciaste sesion, porfavor iniciar sesion para continuar navegando')
        location.href='login.html';
        }
        else {
        document.getElementById('cerrar').style.display = 'block';
        document.getElementById('usuario').innerHTML = usuario;
        }
        
    })
    getJSONData(comentarios).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoComentarios = resultObj.data; 
            mostrarComentarios(infoComentarios)  
        } 
    })
    document.getElementById("cerrar").addEventListener("click", () => {
        alert('Sesion Cerrada');
        sessionStorage.clear();
        location.href = 'login.html';
    });
    document.getElementById("comentar").addEventListener("click", () => {
        nuevoComentario()  
    });
    

})