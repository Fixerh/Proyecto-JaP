let url= 'https://japceibal.github.io/emercado-api/cats_products/101.json';

function ShowProductsList(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let car = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="`+ car.image +`" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ car.name + " - " + car.currency + " " + car.cost +`</h4> 
                        <p> `+ car.description +` </p> 
                        </div>
                        <small class="text-muted"> `+ car.soldCount +` ventas</small> 
                    </div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data.products;
            ShowProductsList(carsArray)
        }
    });
})

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