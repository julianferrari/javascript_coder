/*
El proyecto permite al usuario adquirir un servicio (carpintero, plomero, electricista, etc).
En funcion del trabajo solicitado, envios y forma de pago se calculan los precios a abonar. 
*/

// Clase "Servicio" con información del trabajador.
class Servicio{
    constructor(nombre, apellido, oficio, calificacion, precio){
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

// Funcion para generar algunos servicios de forma aleatoria.
function generar_servicios(cantidad){
    let lista_nombres = ["Juan","Pedro","Maria","Paula","Jose","Carlos","Raul","Pablo","Rocio"];
    let lista_apellidos = ["Garcia","Perez","Gutierrez","Hernandez","Fernandez","Ibarra","Mandeb"];
    let lista_oficios = ["Electricista","Albañil","Plomero","Pintor","Mecanico","Arquitecto","Taxista","Decorador"];

    let lista_servicios = [];
    for(let x=0; x<cantidad; x++){
    
        let nombre = lista_nombres[parseInt(Math.random()*lista_nombres.length)];
        let apellido = lista_apellidos[parseInt(Math.random()*lista_apellidos.length)];
        let oficio = lista_oficios[parseInt(Math.random()*lista_oficios.length)];
        let calificacion = parseInt(Math.random()*5 + 1);
        let precio = parseInt(Math.random()*1000);

        let nuevo_usuario = new Servicio(nombre, apellido, oficio, calificacion, precio);
        lista_servicios.push(nuevo_usuario);
    }
    return lista_servicios;
}

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

function dolarizar(lista){
    lista.precio = parseFloat(lista.precio) / 285; //Dolar hoy...
    lista.precio = parseFloat(lista.precio.toFixed(2));
}
function pesificar(lista){
    lista.precio = parseFloat(lista.precio) * 285; //Dolar hoy...
    lista.precio = parseFloat(lista.precio.toFixed(2));
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



function mostrar_prestadores(){
    let disponibles_list = document.getElementById("cards");
    disponibles_list.innerHTML = "";
    for(let x=0; x<servicio_disponible.length; x++){
        let card = document.createElement("div");
        card.innerHTML =   `<div class="card" style="width: 18rem;">
                                <img src="../assets/images/martillo.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h3 class="card-title">${servicio_disponible[x].nombre} ${servicio_disponible[x].apellido}</h3>
                                    <h4 class="card-title">${servicio_disponible[x].oficio}</h4>  
                                    $<span class="card-title">${servicio_disponible[x].precio}</span>
                                    <h5 class="card-title">Calificación: ${servicio_disponible[x].calificacion}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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


let carrito = [];

function agregar_servicio(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    
    let nombre_servicio = padre.querySelector("h3").textContent;
    let oficio_servicio = padre.querySelector("h4").textContent;
    let precio_servicio = padre.querySelector("span").textContent;
    let calificacion_servicio = padre.querySelector("h5").textContent;
    let img_servicio = abuelo.querySelector("img").src; 

    let servicio = {
        nombre: nombre_servicio,
        oficio: oficio_servicio,
        precio: precio_servicio,
        calificacion: calificacion_servicio,
        imagen: img_servicio,
        cantidad: 1
    };
   
    carrito.push(servicio);
    console.log(carrito);
    //Ahora lo paso a JSON porque no puedo guardar un arreglo de objetos.
    let carrito_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito_JSON);


    mostrar_carrito(servicio);


}

function mostrar_carrito(servicio){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${servicio.imagen}"></td>
                            <td>${servicio.nombre}</td>
                            <td>${servicio.precio}</td>
                            <td>${servicio.calificacion}</td>
                            <td><button class="btn-danger">Quitar</button></td>`


    
    let tabla = document.getElementById("tbody");
    tabla.append(fila);
    
}


function calcular_precio(item, envio, pago){
    let precio = parseInt(item.precio);
    let recargo = parseFloat(parseFloat(recargos(precio, envio, pago)).toFixed(2));  
    let total = parseFloat(parseFloat(calcular(precio, recargo)).toFixed(2));
    
    temp = "Usted adquiere los servicios de " + item.oficio + " de " + item.nombre + "\n";
    temp += "El precio es de $ "+ precio + "\n";
    temp += "Se añaden $ " + recargo + " de recargo por el envío y el medio de pago elegido.\n";
    temp += "En total usted paga $ " + total;

   return temp
}

function ordenar_precio(a,b){
    return parseFloat(a.precio)-parseFloat(b.precio)
}

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

let nombre = document.getElementById("nombre_usuario");

let lista_servicios = generar_servicios(100); //Genero una lista de servicios aleatoria.
//console.log(lista_servicios[1].calificacion);
//lista_servicios[1].get_presentacion();
//lista_servicios[1].set_presentacion("Soy un profesional matriculado etc...");
//lista_servicios[1].get_presentacion();

let servicios_list = document.getElementById("servicios_list");
let lista_aux = get_servicios(lista_servicios);
for(let x=0; x<lista_aux.length; x++){
    let li = document.createElement("li");
    li.innerHTML = `<li>${lista_aux[x]}</li>`
    servicios_list.append(li);
}

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

let flagDolar = false;
let servicio_disponible;
let boton_servicio = document.getElementById("boton_servicio");
boton_servicio.addEventListener("click", function(){
    let servicio = document.getElementById("servicio");   
    let servicio_existe = lista_servicios.find(servicios => servicios.oficio == servicio.value);
    if (servicio_existe){
        servicio_disponible = lista_servicios.filter(servicios => servicios.oficio == servicio.value);
        if((checkBox3.checked == false)&&(flagDolar==true)){servicio_disponible.map(pesificar);flagDolar=false;}
        if((checkBox3.checked == true)&&(flagDolar==false)){servicio_disponible.map(dolarizar);flagDolar=true;}
        if(checkBox1.checked == true){servicio_disponible.sort(ordenar_precio);}
        if(checkBox2.checked == true){servicio_disponible.sort((a,b) => parseInt(b.calificacion) - parseInt(a.calificacion));}           
        mostrar_prestadores();
        
       
    }else{
        alert("Ese servicio no existe");
    }
})








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

            
    for(let i=0; i<carrito.length; i++){
        let calculo = document.createElement("p");        
        let texto = calcular_precio(carrito[i], envio, pago);    
        calculo.innerHTML = `<p>${texto}</p>`;  
        resultado.append(calculo);
        //resultado.scrollIntoView();
    }
});




