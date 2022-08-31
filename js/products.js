let productos = [];
let enlace = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
const oAscendenteNombre = "0-9";
const oDescendenteNombre = "9-0";
const oVendidos = "Ventas";
let criterioDeOrdenar = undefined;
let minCost = undefined;
let maxCost = undefined;

function ordenar(criteria, array){
    let result = [];
    if (criteria === oAscendenteNombre)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === oDescendenteNombre){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === oVendidos){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function mostrarLista(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let products = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){
        htmlContentToAppend += `
        <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src=" ${products.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${products.name} - ${products.currency} ${products.cost}</h4> 
                        <p> ${products.description} </p> 
                        </div>
                        <small class="text-muted"> ${products.soldCount} ventas</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function busca(productos) {
    let busqueda = document.getElementById('buscador').value;
    

    let product = productos.filter(producto => {
        return (producto.name.toLowerCase().indexOf(busqueda.toLowerCase()) >-1) || (producto.description.toLowerCase().indexOf(busqueda.toLowerCase()) >-1); 
    })
    

    mostrarLista(product);

    
}

function ordenoYMuestro(sortCriteria){
    
    criterioDeOrdenar = sortCriteria;
    
    productos = ordenar(criterioDeOrdenar, productos);
    
    mostrarLista(productos);
}



document.addEventListener("DOMContentLoaded", ()=> {
    getJSONData(enlace).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data.products;
            mostrarLista(productos)
        }
        document.getElementById('tittle').innerHTML = `Veras aqui todos los productos de la categoria ` + resultObj.data.catName
        let usuario = sessionStorage.getItem('usuario');
        if(usuario == null){
        alert('No iniciaste sesion, porfavor iniciar sesion para continuar navegando')
        location.href='login.html';
        }
        else {
        document.getElementById('cerrar').style.display = 'block';
        document.getElementById('usuario').innerHTML = usuario;
        }
    });
   
    document.getElementById("clasificacionAs").addEventListener("click", ()=> {
        ordenoYMuestro(oAscendenteNombre);
        console.log(productos);
    });

    document.getElementById("clasificacionDs").addEventListener("click", ()=> {
        ordenoYMuestro(oDescendenteNombre);
    });

    document.getElementById("clasificacionVen").addEventListener("click", ()=> {
        ordenoYMuestro(oVendidos);
    });

    document.getElementById("limpiarFiltro").addEventListener("click", ()=> {
        document.getElementById("rPrecioMin").value = "";
        document.getElementById("rPrecioMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarLista(productos);
    });

    document.getElementById("filtro").addEventListener("click", ()=> {
        minCost = document.getElementById("rPrecioMin").value;
        maxCost = document.getElementById("rPrecioMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        mostrarLista(productos);
    });

    document.getElementById("cerrar").addEventListener("click", () => {
        alert('Sesion Cerrada');
        sessionStorage.clear();
        location.href = 'login.html';
    });
    
    document.getElementById('buscador').addEventListener('keyup', ()=> {
        busca(productos);
    })
})
