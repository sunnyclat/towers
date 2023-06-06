window.addEventListener("load",iniciar,false); //lo podemos tener arriba o abajo, pero que este para llamar al alert

var fichaSeleccionada;  //al seleciconar un cuadro quedara marcada la ficha origen, siendo la mas alta la fichaSeleccionada la cual podra ser movida a otro cuadro
var origenCuadro;
var destinoCuadro;

const altura="40px";

var cuerpo; // crea la variable que formara parte del body en el archivo HTML

var cuadro1= new Cuadro(true); //objetos del tipo o clase cuadro
var cuadro2= new Cuadro(false);
var cuadro3= new Cuadro(false);


var mov=0;




function over(cuadro){
    cuadro.caja.style.backgroundColor="#ADFAFF"; //color celeste
}

function over1(){
    over(cuadro1); //le pasamos el objeto del metodo generico 
}

function over2(){
    over(cuadro2);
    
}


function over3(){
    over(cuadro3);
    
}


function crearDiv(){
    var caja= document.createElement("div");  //crea la variable que contendra el elemento "div". Div es una seccion de codigo en el body del HTML
    
    return caja;  //devolvemos el valor de caja
}




function seleccionaOrigenYDestino(cuadro){
    
    if(origenCuadro ==undefined){ //si  el cuadro origen no ha sido iniciado (todavia no tiene ningun valor)
     
        if(cuadro.tieneFichas()){ // y si el cuadro tiene fichas
           
            cuadro.caja.style.borderColor= "green"; //el usuario al seleccionar el cuadro se volvera rojo
        origenCuadro=cuadro; //ahora origen va a tener el valor de cuadro 
        origenCuadro.elegido= true; //el cuadro origen se vuelve elegido verdadero.
        
        }
        
    }else if(origenCuadro != undefined && destinoCuadro == undefined){ //si el cuadro origen ya fue iniciado (el jugador ya eligio un cuadro del cual copiar) y el cuadro destino no ha sido iniciado (el cuadro destino no tiene valor) 
        
         cuadro.caja.style.borderColor= "blue";
        destinoCuadro = cuadro; //destinoCuadro tiene ahora el valor de cuadro
        
        destinoCuadro.elegido= true; //destino cuadro es elegido verdadero
        
        
        
        if(origenCuadro != destinoCuadro){ //si el cuadro origen no es el cuadro destino (que es lo que buscamos), evitando que el jugador elija el cuadro origen y luego vuelva a clickear en el (intentando mover la ficha del cuadro al mismo cuadro)
            
            if(!(destinoCuadro.tieneFichas()) ||   //si el cuadro destino no tiene fichas o su valor es mayor al del cuadro origen
                    (origenCuadro.obtieneFichaSup().valor < destinoCuadro.obtieneFichaSup().valor)    ){
                
                
                origenCuadro.quitaFichaSup(); //quitamos la ficha superior del cuadro origen
                origenCuadro.redibujaCaja(); // lo redibujamos
                destinoCuadro.insertaFichaSup();// la ficha la insertamos en el cuadro destino
                destinoCuadro.redibujaCaja();// lo redibujamos
               
                mov++; //para contabillizar los movimientos
                actualizarContador();//pasa el contador de movimientos atualizado a parrafo
        
                
                
                
            }
            
            
            
            
            
            
            
        }
        
        
        
        
        
        
    }
    

    
    if(destinoCuadro != undefined && origenCuadro != undefined){ //si el destino cuadro tiene contenido e igual el cuadro origen
       
        reseteaOrigenYDestino();
    }
    
    
    
    if(siHeGanado()){
    victoria();
    
    
}
    
    
}




function siHeGanado(){
    
    
    if(cuadro3.contenido[0] instanceof Relleno &&           //si el primer elemento del cuadro 3 esta ocupado
          cuadro3.contenido[1] instanceof FichaS &&       //si el segundo elemento del cuadro 3 es una ficha pequeña
            cuadro3.contenido[2] instanceof FichaM &&
cuadro3.contenido[3] instanceof FichaL &&
cuadro3.contenido[4] instanceof FichaXL ){
 
        return true;


}else{
    
    
    return false;
}


}



function victoria(){
    
    var textoTitulo = document.createTextNode("Ganaste !");
    var textoSubtitulo= document.createTextNode("Movimiento hechos: " + mov);
    var consejos= document.createTextNode("Pulsa F5 para jugar nuevamente");
    
    
    cuerpo.removeChild(cuadro1.caja);            //remueve todo el contenido de lo creado en el div
      cuerpo.removeChild(cuadro2.caja);
    
      cuerpo.removeChild(cuadro3.caja);
      
      cuerpo.removeChild(document.getElementById("contador"));
    
    
    var titulo= document.createElement("h1");
    
    titulo.style.color="red";
    
    titulo.appendChild(textoTitulo);
    
    var subtitulo= document.createElement("h2");
    subtitulo.appendChild(textoSubtitulo);
    
    
    var consejo= document.createElement("h3");
    
    consejo.appendChild(consejos);
    
    
    cuerpo.appendChild(titulo);
     cuerpo.appendChild(subtitulo);
      cuerpo.appendChild(consejo);
    
}



function reseteaOrigenYDestino(){
    
    if(origenCuadro != undefined){
    
    
    origenCuadro.caja.style.borderColor="black";
    
    origenCuadro.elegido=false; //al no ser seleccinado figura como negro

    }
    
    if(destinoCuadro !=undefined){
       
          
    origenCuadro.caja.style.borderColor="black";
        destinoCuadro.elegido=false; 
    }
 

origenCuadro=undefined;
destinoCuadro=undefined;


/*
cuadro1.elegido=false;   //opcion en el caso que no se haya deseleccionado el cuadro
cuadro2.elegido=false;
cuadro3.elegido=false;
     */


}


    function actualizarContador(){
        
        
        var parrafo = document.getElementById("contador"); //actualizamos el contador con los movimientos
        parrafo.innerHTML="Movimientos: "+mov; //accedemos al contenido que tiene parrafo y le concatenamos movimientos.
    }


function out(cuadro){
 //   cuadro.caja.style.backgroundColor="#FFFFFF";
}




function out1(){
out(cuadro1);
}

function out2(){
  out(cuadro2);
}

function out3(){
 out (cuadro3);
}





function click1(){
    cuadro1.elegido= !cuadro1.elegido;  //esta elegido o no esta elegido con click
    
    click(cuadro1);
    
}

function click2(){
    cuadro2.elegido= !cuadro2.elegido;
    
    click(cuadro2);
    
}

function click3(){
    cuadro3.elegido= !cuadro3.elegido;
    
    click(cuadro3);
    
}

function click(cuadro){  

    if(cuadro.elegido){  // si esta elegido es rojo y sino negro
       
         cuadro.caja.style.borderColor="green";
    //    alert(cuadro.tieneFichas());//llamamos a la funcion tieneFichas en donde las llenamos o no con fichas.
 seleccionaOrigenYDestino(cuadro);
 
        
        
    } else{
 //       cuadro.caja.style.borderColor="green";
 
 cuadro.caja.style.borderColor="black";
 
 reseteaOrigenYDestino(); //deseleciona la caja en el caso que el jugador se haya equivocado
 
    }
}


function rellenContArrayVacio(){  //funcion devuelve array de 5 elementos de relleno vacio
    
    var conten= new Array();  // conten lo instanciamos como array
    
    
    
    for (var i=0;i<5;i++){
        
        conten[i]= new Relleno();
    }
    
    return conten;  //devolvemos al array con el espacio de 5 elementos
}



function Relleno(){ //constructor relleno
    
    this.caja= crearDiv();   //citamos caja con su metodo o constructor teniendo el valor ("div").
    this.caja.style.width="100%";  // este relleno es el contenido dentro del cuadro
    this.caja.style.height=altura;
    
    
}


function rellenFichasArray(){        //relleno contenido fichas
    var conten2= new Array(); //este es un nuevo array que creamos para ir rellenando los cuadros con fichas o no
    
    
    conten2[0]= new Relleno();  //el primero cita al relleno, o sea que no tendra fichas.
    conten2[1]=new FichaS();       //vamos rellenando cada celda del array con su respectivo objeto de ficha
    conten2[2]=new FichaM();
    conten2[3]=new FichaL();
    conten2[4]=new FichaXL();
    
    return conten2;
}




function FichaS(){
    this.caja=crearDiv();          //en cada ficha citamos el metodo con el valor de "div" de la caja
    this.caja.style.width="10%";
    this.caja.style.height=altura;
    this.caja.style.backgroundColor="#0088CC";
         this.caja.style.marginLeft="auto";
              this.caja.style.marginRight="auto";
              this.valor=0;  //le ponemos valores a cada ficha para establecer cual es la mas grande
}


function FichaM(){
    this.caja=crearDiv();
    this.caja.style.width="30%";
    this.caja.style.height=altura;
    this.caja.style.backgroundColor="#979797";
         this.caja.style.marginLeft="auto";
              this.caja.style.marginRight="auto";
               this.valor=1;
}


function FichaL(){
    this.caja=crearDiv();
    this.caja.style.width="50%";
    this.caja.style.height=altura;
    this.caja.style.backgroundColor="#666666";
         this.caja.style.marginLeft="auto";
              this.caja.style.marginRight="auto";
               this.valor=2;
}

function FichaXL(){
    this.caja=crearDiv();
    this.caja.style.width="70%";
    this.caja.style.height=altura;
    this.caja.style.backgroundColor="#000000";
         this.caja.style.marginLeft="auto";
              this.caja.style.marginRight="auto";
               this.valor=3;
}







function Cuadro(cajaInic){ //constructor cuadro caja inicial es un booleano
    
    this.caja= crearDiv();
    
    this.caja.style.width = "28%";
    this.caja.style.height="200px";
    
    //    this.caja.style.marginLeft="auto";
    //    this.caja.style.marginRight="auto";
     this.caja.style.marginLeft="4%";
  this.caja.style.marginLeft="4%";

        this.caja.style.borderWidth= "2%"; 
        this.caja.style.border="solid black";
        this.caja.style.float="left";
        
        this.elegido=false;
        
       this.contenido;  //this.contenido tambien funciona               var contenido
        
        
        if(cajaInic){
            this.contenido=rellenFichasArray(); //array lleno
        }else{
            this.contenido=rellenContArrayVacio(); //array vacio
            
        }
        
        
        
        for(var i=0;i <this.contenido.length;i++){
            this.caja.appendChild(this.contenido[i].caja);
        }
        
        
        this.tieneFichas= function(){
        
        var rellenos= 0;
        
        
        
        for(var i= 0; i< this.contenido.length;i++){  //itera por el array contenido para comprobar que tipo de cuadro tiene ficha
        
        
        if(this.contenido[i] instanceof Relleno){ //si el contenido del objeto relleno es del mismo tipo de relleno
        
        rellenos++;  //ahora rellenos va a tener el mismo numero de cuadros vacios
      
                
                }
        
        // 1 //5 // 5
        
            
            }
            
            
            
            
      if(rellenos == this.contenido.length){ //si tiene el mismo tamaño que el contenido del array
         
         
         return false;  //retorna falso estando vacio
         
            } else{    //retorna verdadero teniendo al menos una.
                
              return true;  
                
            }
         
    };
    
    this.obtieneFichaSup=function(){
        
      for(var i=0;i < this.contenido.length;i++){
          
          if( !(this.contenido[i] instanceof Relleno)){ //tenemos que ver que el contenido no sea de tipo relleno
              
              return this.contenido[i]; //si encontramos alguna ficha en el contenido, la devolvemos, terminando el metodo entero, sin que pase a las siguientes fichas. queremos que solo agarre la ficha superior y listo
          //    fichaSeleccionada = this.contenido[i];
          }
          
          
      }  
        
    };
   

this.quitaFichaSup = function(){
    
    for(var i=0; i < this.contenido.length;i++){
        
        if(!(this.contenido[i] instanceof Relleno)){ //si no encontramos un contenido de tipo relleno, deberemos encontar un contenido de tipo ficha
            
            fichaSeleccionada = this.contenido[i]; //aca marcamos la ficha seleccionada
            this.contenido[i]= new Relleno(); //en su lugar ponemos el objeto relleno estando vacio.
            break; //salimos del metodo. necesitamos salir del metodo como hicimos con el de obtieneFichaSup ya que sino seguira y dejaria el cuadro todo con cuadros blancos, cuando necesitams que esto solo pase con la ficha superior seleciconada
            
        }
        
        
        
    }
    
};

this.insertaFichaSup= function(){
                                                   
    for(var i = this.contenido.length - 1; i >= 0 ;   i--){ //la i es igual al ultimo valor del contenido, y le restamos -1 para evitar al indice 0. con i-- ira en reversa bajando
        
        
        if(this.contenido[i] instanceof Relleno){ //si encuentra contenido
          
            this.contenido[i] = fichaSeleccionada; //inserta la ficha seleccionada al contenido
            break; //ya hecho el procedimiento con dicha ficha sale del bucle para no seguir con las siguientes como venimos haciendo
        }
        
        
    }
    
};

this.redibujaCaja= function(){ //redibujara los cambios producidos en cada caja
    
    
    while(this.caja.hasChildNodes()){ //metodo del documento en donde nos dice si la caja tiene otros elementos
        
        this.caja.removeChild(this.caja.lastChild); //borramos hasta el ultimo contenido hasta que quede vacia
    }
    
    
    for(var i=0; i< this.contenido.length;i++){
        this.caja.appendChild(this.contenido[i].caja); //recorremos y guardamos el contenido dentro de la caja. todavia no dibuja sino que guarda los elementos
    }                                                  //NO OLVIDAR PONER CAJA, ya que es el objeto del array que contiene todo
    
    
    
    
};




}


function iniciar(){  //seria como el main
   
    cuerpo= document.getElementsByTagName("body")[0];  //citamos al body el HTML
    
    cuerpo.style.textAlign="center"; //centro el texto
    
    
 
    

  
  
  cuerpo.appendChild(cuadro1.caja);  //el cuerpo que representa al body lo pegamos a un objeto que traemos por argumento siendo cuadro el cual nos trae la caja que contiene el "div"
  cuerpo.appendChild(cuadro2.caja);
     cuerpo.appendChild(cuadro3.caja);
  

 
 cuadro1.caja.addEventListener("mouseover",over1,false);
    cuadro2.caja.addEventListener("mouseover",over2,false);
      cuadro3.caja.addEventListener("mouseover",over3,false);
      
      
       cuadro1.caja.addEventListener("mouseout",out1,false);
      
       cuadro2.caja.addEventListener("mouseout",out2,false);
      
       cuadro3.caja.addEventListener("mouseout",out3,false);
      
      
      cuadro1.caja.addEventListener("click",click1,false); //"click" hace mencion al metodo click el cual verifica si el cuadro esta vacio o no. click1 le avisa al metodo "click" si el cuadro fue seleccionado
          cuadro2.caja.addEventListener("click",click2,false);
              cuadro3.caja.addEventListener("click",click3,false);
      
      
      
      
      var texto= document.createTextNode("Movimientos: " + mov);  //mov es el contador que estamos usando en seleccionaOrigen y destino
  var parrafo= document.createElement("p"); //crea etiqueta p en html
  parrafo.style.clear= "both"; //limpia ambos parrafos de un lado y del otro
  parrafo.style.paddinTop="3em"; //em es el tamaño que tengo de texto en pixeles. con paddin separamos el espacio blanco de arriba del cuadrado
  parrafo.setAttribute("id","contador");//establecemos un atributo id  y un atributo contador. parrafo tendra la id con el valor del contador
  parrafo.appendChild(texto); //le pasamos la variable texto
  cuerpo.appendChild(parrafo);//pe pasamos la variable parrafo el cual contiene la variable texto. todo al body de html
  
  
}










