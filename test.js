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

// Funciones para mostrar los servicios.
function show_servicios(lista){
    let lista_aux = []; 
    lista.forEach(function(item){ //Para que no muestre oficios repetidos.
        if(!lista_aux.includes(item.oficio)){
            lista_aux.push(item.oficio);
        }
    })
    let temp = "Los servicios disponibles son: \n";
    for(let x=0; x<lista_aux.length; x++){
        temp += lista_aux[x] + " \n";
    }
    alert(temp);
}

function show_servicios_disponibles(lista){
    temp = "Los servicios disponibles son: \n";
    for(let x=0; x<lista.length; x++){
        temp += x + "- " + lista[x].nombre + " " + lista[x].apellido + " - AR$ " + lista[x].precio + " - Calificación: " + lista[x].calificacion+"\n"; 
    }
    alert(temp);
}

function show_servicio_adquirido(item, envio, pago){
    let precio = item.precio;
    let recargo = parseFloat(parseFloat(recargos(precio, envio, pago)).toFixed(2));
    let total = parseFloat(parseFloat(calcular(precio, recargo)).toFixed(2));
    
    temp = "Usted adquiere los servicios de " + item.oficio + " de " + item.nombre + " " + item.apellido + "\n";
    temp += "El precio es de AR$ "+ precio + "\n";
    temp += "Se añaden AR$ " + recargo + " de recargo por el envío y el medio de pago elegido.\n";
    temp += "En total usted paga AR$ " + total;

    alert(temp);
}

function ordenar_precio(a,b){
    return parseFloat(a.precio)-parseFloat(b.precio)
}

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

let lista_servicios = generar_servicios(100); //Genero una lista de servicios aleatoria.
//console.log(lista_servicios[1].calificacion);
//lista_servicios[1].get_presentacion();
//lista_servicios[1].set_presentacion("Soy un profesional matriculado etc...");
//lista_servicios[1].get_presentacion();


show_servicios(lista_servicios);
let servicio = prompt("¿Qué servicio quiere contratar?:");

let servicio_existe = lista_servicios.find(servicios => servicios.oficio == servicio);
console.log(servicio_existe);
if (servicio_existe){
    let servicio_disponible = lista_servicios.filter(servicios => servicios.oficio == servicio);
    //console.log(servicio_disponible)

    let ordenamiento = parseInt(prompt("Ordenar a los prestadores de servicios por [0- Ninguna / 1-Precio / 2-Calificación]:"));
    if (ordenamiento==1){
        servicio_disponible.sort(ordenar_precio);
    }else if(ordenamiento==2){
        servicio_disponible.sort((a,b) => parseInt(b.calificacion) - parseInt(a.calificacion));
    }
    
    show_servicios_disponibles(servicio_disponible);
    

    let eleccion = prompt("Elija a un prestador de servicio:"); 
    let envio = prompt("¿Necesita envío a domicilio? [Y/N]:");
    let pago = parseInt(prompt("Eliga el medio de pago: [1-Mercado Pago (0%) / 2-CBU (10%)"));
    show_servicio_adquirido(servicio_disponible[eleccion], envio, pago); 
}else{
    alert("No tenemos el servicio solicitado.");
    console.log("No tenemos el servicio solicitado.");
}
