/*
El proyecto permite al usuario adquirir un servicio (carpintero, plomero, electricista, etc).
En funcion del trabajo solicitado, envios y forma de pago se calculan los precios a abonar. 
*/

/////////////////////////////////////////////////////////////////////
// Clase "Servicio" con información del trabajador.
class Servicio{
    constructor(id, nombre, apellido, oficio, calificacion, precio){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.oficio = oficio;
        this.calificacion = calificacion;
        this.precio = precio;
        this.presentacion = "";
    }
    get_presentacion(){    
        console.log(this.presentacion);
    }
    set_presentacion(presentacion){
        this.presentacion = presentacion;
    }
    set_calificacion(calificacion){
        this.calificacion = calificacion;
    }
    get_calificacion(){
        console.log(this.calificacion);
    }
}

/////////////////////////////////////////////////////////////////////
// Funcion para generar algunos servicios de forma aleatoria.
function generar_servicios(cantidad){
    let lista_nombres = ["Juan","Pedro","Maria","Paula","Jose","Carlos","Raul","Pablo","Rocio"];
    let lista_apellidos = ["Garcia","Perez","Gutierrez","Hernandez","Fernandez","Ibarra","Mandeb"];
    let lista_oficios = ["Electricista","Albañil","Plomero","Pintor","Mecanico","Arquitecto","Taxista","Carpintero"];

    let lista_servicios = [];
    for(let x=0; x<cantidad; x++){
    
        let id = x;
        let nombre = lista_nombres[parseInt(Math.random()*lista_nombres.length)];
        let apellido = lista_apellidos[parseInt(Math.random()*lista_apellidos.length)];
        let oficio = lista_oficios[parseInt(Math.random()*lista_oficios.length)];
        let calificacion = parseInt(Math.random()*5 + 1);
        let precio = parseInt(Math.random()*1000);

        let nuevo_usuario = new Servicio(id, nombre, apellido, oficio, calificacion, precio);
        lista_servicios.push(nuevo_usuario);
    }
    return lista_servicios;
}

function get_servicios(lista){
    let lista_aux = []; 
    lista.forEach(function(item){ //Para que no muestre oficios repetidos.
        if(!lista_aux.includes(item.oficio)){
            lista_aux.push(item.oficio);
        }
    })
    return lista_aux
}

/////////////////////////////////////////////////////////////////////
// Funciones para calcular los precios.
function calcular(precio, recargo){
    let total = precio + recargo;
    return total
}
function recargos(precio, envio, pago){
    let recargo = 0;
    if(envio == "Y"){
        recargo = 0.05 * precio;
    }
    if(pago == 2){
        recargo += 0.1 * precio;
    }
    return recargo
}
function calcular_precio(item, envio, pago){
    let precio = parseInt(item.precio * item.cantidad);
    let recargo = parseFloat(parseFloat(recargos(precio, envio, pago)).toFixed(2));  
    let total = parseFloat(parseFloat(calcular(precio, recargo)).toFixed(2));
    
    temp = "Usted adquiere los servicios de " + item.oficio + " de " + item.nombre + "\n";
    temp += "El precio es de $ "+ precio + "\n";
    temp += "Se añaden $ " + recargo + " de recargo por el envío y el medio de pago elegido.\n";
    temp += "En total usted paga $ " + total;

   return {temp, total};
}

/////////////////////////////////////////////////////////////////////
function dolarizar(lista){
    lista.precio = parseFloat(lista.precio) / 285; //Dolar hoy...
    lista.precio = parseFloat(lista.precio.toFixed(2));
}
function pesificar(lista){
    lista.precio = parseFloat(lista.precio) * 285; //Dolar hoy...
    lista.precio = parseFloat(lista.precio.toFixed(2));
}
function ordenar_precio(a,b){
    return parseFloat(a.precio)-parseFloat(b.precio)
}

/////////////////////////////////////////////////////////////////////
//Funcion para mostrar los prestadores
function mostrar_prestadores(){
    let disponibles_list = document.getElementById("cards");
    disponibles_list.innerHTML = "";
    for(let x=0; x<servicio_disponible.length; x++){
        let card = document.createElement("div");
        card.innerHTML =   `<div class="card" id="${x}" style="width: 18rem;">
                                <img src="./assets/images/${servicio_disponible[x].oficio}.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h3 class="card-title">${servicio_disponible[x].nombre} ${servicio_disponible[x].apellido}</h3>
                                    <h4 class="card-title">${servicio_disponible[x].oficio}</h4>  
                                    $<span class="card-title">${servicio_disponible[x].precio}</span>
                                    <h5 class="card-title">Calificación: ${servicio_disponible[x].calificacion}</h5>
                                    <p class="card-text">Descripción...</p>
                                    <a class="btn btn-primary boton_agregar">Agregar</a>
                                </div>
                            </div>`
        disponibles_list.append(card);
        let btn_compra = document.querySelectorAll(".boton_agregar");
        for(let boton of btn_compra){
            boton.addEventListener("click", agregar_servicio);
        }
    }
}

/////////////////////////////////////////////////////////////////////
//Funciones para el carrito de compra
let carrito = [];
//let contador = 0;
function agregar_servicio(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    
    let identificador = abuelo.id;
    
    let id_servicio = servicio_disponible[identificador].id;
    let nombre_servicio = servicio_disponible[identificador].nombre + " " + servicio_disponible[identificador].apellido;
    let oficio_servicio = servicio_disponible[identificador].oficio;
    let precio_servicio = servicio_disponible[identificador].precio;
    let calificacion_servicio = servicio_disponible[identificador].calificacion;
    /*let nombre_servicio = padre.querySelector("h3").textContent;
    let oficio_servicio = padre.querySelector("h4").textContent;
    let precio_servicio = padre.querySelector("span").textContent;
    let calificacion_servicio = padre.querySelector("h5").textContent;*/
    let img_servicio = abuelo.querySelector("img").src; 

    let servicio = {
        id: id_servicio,
        nombre: nombre_servicio,
        oficio: oficio_servicio,
        precio: precio_servicio,
        calificacion: calificacion_servicio,
        imagen: img_servicio,
        cantidad: 1
    };
   
    let flag = false;
    carrito.forEach(function(item){
        if(item.id == id_servicio){ //Si el servicio ya existe en el carrito
            item.cantidad++;
            flag = true;
        }
    })
    console.log(carrito)
    if(flag == false){
        carrito.push(servicio); 
        mostrar_carrito(servicio);
    }
    else{
        actualizar_carrito(); 
    } 
    //console.log(contador);
    //Ahora lo paso a JSON porque no puedo guardar un arreglo de objetos.
    let carrito_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito_JSON);

    //mostrar_carrito(servicio);
    makeToastify();
}

let tabla = document.getElementById("tbody");
function mostrar_carrito(servicio){
    let fila = document.createElement("tr");
    fila.innerHTML =   `<td>${servicio.id}</td>
                        <td><img src="${servicio.imagen}"></td>
                        <td>${servicio.cantidad}</td>
                        <td>${servicio.nombre}</td>
                        <td>${servicio.precio}</td>
                        <td>${servicio.calificacion}</td>
                        <td><button class="btn-danger">Quitar</button></td>`
    tabla.append(fila);
    
    let btn_quitar = document.querySelectorAll(".btn-danger");
    for(let boton of btn_quitar){
        boton.addEventListener("click", quitar_servicio);
    }
}

function actualizar_carrito(){
    tabla.innerHTML = ``;
    carrito.forEach(function(servicio){
        mostrar_carrito(servicio);
    })
}


function quitar_servicio(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

  
    let id_servicio = parseInt(abuelo.querySelector("td").textContent);
    console.log("Queiro borrar el servicio con id:",id_servicio);       
    let quitar_item=0;
    for(let x=0; x<carrito.length; x++){
        if(carrito[x].id == id_servicio){
            quitar_item=x;
            break;
        }
    } 
    
    if(carrito[quitar_item].cantidad>1){ //Hay más de uno.
        carrito[quitar_item].cantidad--;
        actualizar_carrito();
    }
    else{ //Solo hay uno.
        carrito.splice(quitar_item, 1);    
        tabla.innerHTML = ``;
        for(let x=0; x<carrito.length; x++){
            mostrar_carrito(carrito[x]);
        }   
        abuelo.remove();   
    }
}



/////////////////////////////////////////////////////////////////////
// GENERAR LOS SERVICIOS (SIMULADO)
//let nombre = document.getElementById("nombre_usuario");
let lista_servicios = generar_servicios(100); //Genero una lista de servicios aleatoria.
//console.log(lista_servicios[1].calificacion);
//lista_servicios[1].get_presentacion();
//lista_servicios[1].set_presentacion("Soy un profesional matriculado etc...");
//lista_servicios[1].get_presentacion();

/////////////////////////////////////////////////////////////////////
// MOSTRAR LOS RUBROS DISPONIBLES
cargar_servicios();

function cargar_servicios(){
    let servicios_list = document.getElementById("servicios_group");
    let lista_aux = get_servicios(lista_servicios);
    for(let x=0; x<lista_aux.length; x++){
        let a = document.createElement("a");
        a.innerHTML = `<a href="#a" class="list-group-item list-group-item-action servicios_group_list">${lista_aux[x]}</a>`
        servicios_list.append(a);    
    }
    let boton_seleccion = document.querySelectorAll(".servicios_group_list");
    for(let boton of boton_seleccion){
        boton.addEventListener("click", seleccion_prestador);
    }
}

/////////////////////////////////////////////////////////////////////
//FORMAS DE MOSTRAR LOS RUBROS
let checkBox1 = document.getElementById("ordenar_precio");
let checkBox2 = document.getElementById("ordenar_calificacion");
let checkBox3 = document.getElementById("mostrar_dolares");
checkBox1.addEventListener("click", function(){
    if ((checkBox1.checked)&&(checkBox2.checked)){
        checkBox2.checked = false;
    }
})
checkBox2.addEventListener("click", function(){
    if ((checkBox2.checked)&&(checkBox1.checked)){
        checkBox1.checked = false;
    }
})

/////////////////////////////////////////////////////////////////////
// MUESTRO LOS SERVICIOS DISPONIBLES PARA EL RUBRO ELEGIDO
let flagDolar = false;
let servicio_disponible;
function seleccion_prestador(e){  
    let servicio = e.target.textContent;
    let servicio_existe = lista_servicios.find(servicios => servicios.oficio == servicio);
    if (servicio_existe){
        servicio_disponible = lista_servicios.filter(servicios => servicios.oficio == servicio);
        if((checkBox3.checked == false)&&(flagDolar==true)){servicio_disponible.map(pesificar);flagDolar=false;}
        if((checkBox3.checked == true)&&(flagDolar==false)){servicio_disponible.map(dolarizar);flagDolar=true;}
        if(checkBox1.checked == true){servicio_disponible.sort(ordenar_precio);}
        if(checkBox2.checked == true){servicio_disponible.sort((a,b) => parseInt(b.calificacion) - parseInt(a.calificacion));}           
        mostrar_prestadores();         
    }  
}

/////////////////////////////////////////////////////////////////////
// SECCION PARA EL PAGO DEL SERVICIO (CALCULO DE PRECIOS)
let checkBox_envio = document.getElementById("envio_domicilio");
let checkBox_pagoMP = document.getElementById("pago_mp");
let checkBox_pagoCBU = document.getElementById("pago_cbu");
checkBox_pagoMP.addEventListener("click", function(){
    if ((checkBox_pagoMP.checked)&&(checkBox_pagoCBU.checked)){
        checkBox_pagoCBU.checked = false;
    }
})
checkBox_pagoCBU.addEventListener("click", function(){
    if ((checkBox_pagoCBU.checked)&&(checkBox_pagoMP.checked)){
        checkBox_pagoMP.checked = false;
    }
})

let resultado = document.getElementById("resultado");
let boton_comprar = document.getElementById("boton_comprar");
boton_comprar.addEventListener("click", function(){
    let envio = "N";
    let pago = 1;
    if(checkBox_envio.checked==true){envio="Y";}
    if(checkBox_pagoMP.checked==true){pago=1;}
    if(checkBox_pagoCBU.checked==true){pago=2;}

    resultado.innerHTML = ``; 
    precio_final = 0;   
    if(carrito.length){
        for(let i=0; i<carrito.length; i++){
            let calculo = document.createElement("p");        
            let datos = calcular_precio(carrito[i], envio, pago);    
            calculo.innerHTML = `<p>${datos.temp}</p>`;  
            resultado.append(calculo);
            precio_final += datos.total;
            console.log(precio_final);
        }
        let precio_total = document.createElement("h5");
        precio_total.innerHTML = `<h5>PRECIO FINAL: $${precio_final}</h5>`;
        resultado.append(precio_total);
        makeToastify_compra();
    }
    else{
        makeAlert();
    }
    resultado.scrollIntoView();
});

/////////////////////////////////////////////////////////////////////
//Librerías

function makeToastify(){
    Toastify({
        text: "Se agregó un servicio al carrito",
        duration: 1500,
        gravity: "bottom",
        destination: "#miCarrito",
        style:{
            fontSize: "20px",
            color: "blue"
        }
    }).showToast();
}

function makeToastify_compra(){
    Toastify({
        text: "¡Gracias por su compra!",
        duration: 1500,
        gravity: "top",
        style:{
            fontSize: "20px",
            background: "goldenrod"
        }
    }).showToast();
}

function makeAlert(){
    Swal.fire({
        icon: "error",
        title: "No tiene nada en el carrito",
    })
}

/////////////////////////////////////////////////////////////////////////////
// FETCH
mostrar_cotizacion()
function mostrar_cotizacion(){
    // API DE COTIZACION DEL DOLAR: https://api.bluelytics.com.ar/v2/latest
    let contenedor = document.getElementById("api_dolar");
    fetch("https://api.bluelytics.com.ar/v2/latest")
        .then(response => response.json()) //el objeto respuesta lo convierto en json porq no lo puedo consumir
        .then(data => {
            //console.log(data);
            //console.log(data.blue.value_buy)
            contenedor.innerHTML =  `<span> U$S --> COMPRA: $${data.blue.value_buy}</span>
                                     <span> - VENTA: $${data.blue.value_sell}</span>
                                     <a href="https://bluelytics.com.ar/#!/api" target="blank"> IR A LA API</a>`
        })

}