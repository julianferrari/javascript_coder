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

// ----------------------------------------------------------

let lista_servicios = generar_servicios(20); //Genero una lista de servicios aleatoria.
//console.log(lista_servicios[1].calificacion);
//lista_servicios[1].get_presentacion();
//lista_servicios[1].set_presentacion("Soy un profesional matriculado etc...");
//lista_servicios[1].get_presentacion();


let servicio = prompt("¿Qué servicio quiere contratar?:");
let lista_aux=[];
// Busco si tengo el servicio solicitado y los guardo en un arreglo auxiliar.
for (let x=0; x<lista_servicios.length; x++){ 
    if (lista_servicios[x].oficio == servicio){
        lista_aux.push(lista_servicios[x]);
    }
}
//console.log(lista_aux);
if(lista_aux.length != 0){ //Muestro los servicios disponibles.
    console.log("Los servicios de",servicio,"disponibles son:")
    for(let x=0; x<lista_aux.length; x++){
        console.log(x+"- "+lista_aux[x].nombre+" "+lista_aux[x].apellido+" tiene una calificacion de "+lista_aux[x].calificacion+" y un precio de "+lista_aux[x].precio);
    }
    let eleccion = parseInt(prompt("Elija un servicio:"));
    let precio = lista_aux[eleccion].precio;
    let envio = prompt("¿Necesita envío a domicilio? [Y/N]:");
    let pago = parseInt(prompt("Eliga el medio de pago: [1-Mercado Pago (0%) / 2-CBU (10%)"));
    let recargo = parseFloat(parseFloat(recargos(precio, envio, pago)).toFixed(2));
    let total = parseFloat(parseFloat(calcular(precio, recargo)).toFixed(2));
    console.log("El precio es de $",precio);
    console.log("Se añaden $",recargo,"de recargo por el envio y el medio de pago elegido.")
    console.log("En total usted paga $",total);
}else{
    console.log("No tenemos el servicio solicitado.")
}