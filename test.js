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
    disponibles_list = document.getElementById("disponibles_list");
    for(let x=0; x<servicio_disponible.length; x++){
        let li = document.createElement("li");
        li.innerHTML = `<li>${x} - ${servicio_disponible[x].nombre} 
                            ${servicio_disponible[x].apellido}
                        - $ ${servicio_disponible[x].precio}
            - calificación: ${servicio_disponible[x].calificacion}</li>`
        disponibles_list.append(li); 
    }
}

function calcular_precio(item, envio, pago){
    let precio = item.precio;
    let recargo = parseFloat(parseFloat(recargos(precio, envio, pago)).toFixed(2));
    let total = parseFloat(parseFloat(calcular(precio, recargo)).toFixed(2));
    
    temp = "Usted adquiere los servicios de " + item.oficio + " de " + item.nombre + " " + item.apellido + "\n";
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

let servicio_disponible;
let boton_servicio = document.getElementById("boton_servicio");
boton_servicio.addEventListener("click", function(){
    let servicio = document.getElementById("servicio");
    //console.log(servicio.value);
   
    let servicio_existe = lista_servicios.find(servicios => servicios.oficio == servicio.value);
    
    if (servicio_existe){
        servicio_disponible = lista_servicios.filter(servicios => servicios.oficio == servicio.value);
    
        if((prompt("¿Quiere ver los precios en dolares? [Y/N]:")) == "Y"){
            servicio_disponible.map(dolarizar);
            //console.log(servicio_disponible);
        }

        let ordenamiento = parseInt(prompt("Ordenar a los prestadores de servicios por [0- Ninguna / 1-Precio / 2-Calificación]:"));
        if (ordenamiento==1){
            servicio_disponible.sort(ordenar_precio);
        }else if(ordenamiento==2){
            servicio_disponible.sort((a,b) => parseInt(b.calificacion) - parseInt(a.calificacion));
        }

        mostrar_prestadores();    
    }else{
        alert("Ese servicio no existe");
    }
})

let resultado = document.getElementById("resultado");
let boton_prestador = document.getElementById("boton_prestador");
boton_prestador.addEventListener("click", function(){
    let eleccion = document.getElementById("prestador");
    let envio = prompt("¿Necesita envío a domicilio? [Y/N]:");
    let pago = parseInt(prompt("Eliga el medio de pago: [1-Mercado Pago (0%) / 2-CBU (10%)"));
    let texto = calcular_precio(servicio_disponible[eleccion.value], envio, pago); 
    console.log(texto);
    resultado.innerHTML = texto;
})





