//constante para haceder al formulario
const formulario = document.getElementById('formulario')
//constante para acceder a todos los imput del formulario
const inputs = document.querySelectorAll('#formulario input')
// constante que nos permite validar la cantidad y el tipo de datos que púeden ingresar el usuario 
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
}

const campos = {
	usuario: false,
	password: false,
}

const validarFormulario = (e) => { //función de tipo flecha=>,
    switch (e.target.name) {

      case "usuario":
        validarCampo(expresiones.usuario, e.target,'usuario');

          break;

      case "pass":
        validarCampo(expresiones.usuario, e.target,'usuario');
    
          break;

    }
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input, i) => { //función de tipo flecha=>,
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
 });

 const validacionDatos = () =>{

    const nombre=getElementById('nombre');
    const password=getElementById('pass');
    if (inputnombre.value == "admininicial"){
        if (inputpassword.value == "admin123456"){
            console.log("todo correcto")
        }else{
            console.log("todo incorrecto")
        }
    }else{
        console.log("todo incorrecto")
    }
 }

 formulario.addEventListener('submit', (e) =>{
     validacionDatos();
 })