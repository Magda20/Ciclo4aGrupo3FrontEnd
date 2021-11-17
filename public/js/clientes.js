//constante para haceder al formulario
const formulario = document.getElementById('formulario')
//constante para acceder a todos los imput del formulario
const inputs = document.querySelectorAll('#formulario input')
// constante que nos permite validar la cantidad y el tipo de datos que púeden ingresar el usuario 
const expresiones = {
    
    cedula: /^\d{3,10}$/, // 4 a 12 digitos,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    direccion: /^[a-zA-Z0-9\s #-]{4,46}$/, // Letras, numeros y numeral,
}

const campos = {
    cedula: false,
    telefono: false,
    nombre: false,
    email: false,
    direccion: false,
}

const validarFormulario = (e) => { //función de tipo flecha=>,
    switch (e.target.name) {

        case "cedula":
            
            validarCampo(expresiones.cedula, e.target, 'cedula');
            break;

        case "telefono":
            console.log(e.target.name)
            validarCampo(expresiones.telefono, e.target, 'telefono');

            break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');

            break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');

            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
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

formulario.addEventListener('submit', (e) =>{ 
e.preventDefault(); 
let datosformulario = {
	"cedula": document.getElementById("cedula").value,
	"correo": document.getElementById("email").value,
	"direccion": document.getElementById("direccion").value,
	"nombre": document.getElementById("nombre").value,
	"telefono": document.getElementById("telefono").value
};
var clientes = $.ajax({
	type:"POST",
	url:"http://localhost:8082/clientes/crear",
	contentType: "application/json; charset=utf-8",
	data : JSON.stringify(datosformulario),
		 success:function(){alert("El Cliente ha sido creado");
			document.getElementById("cedula").value="";
			document.getElementById("direccion").value="";
			document.getElementById("email").value="";
			document.getElementById("nombre").value="";
			document.getElementById("telefono").value="";
			}
		})	
	
	
});

document.getElementById("btn-borrar").addEventListener('click', function(){
	var clientes = $.ajax({
			type:"DELETE",
			url:"http://localhost:8082/clientes/borrar/" +document.getElementById("cedula").value,
			success:function(){alert("El usuario ha sido eliminado");
			document.getElementById("cedula").value="";
			document.getElementById("cedula").value="";
			document.getElementById("direccion").value="";
			document.getElementById("email").value="";
			document.getElementById("nombre").value="";
			document.getElementById("telefono").value="";
			}
	})
});

document.getElementById("btn-actualizar").addEventListener('click', function(){
	let datosformulario = {
		"cedula": document.getElementById("cedula").value,
		"correo": document.getElementById("email").value,
		"direccion": document.getElementById("direccion").value,
		"nombre": document.getElementById("nombre").value,
		"telefono": document.getElementById("telefono").value
	};
	var clientes = $.ajax({
			type:"PUT",
			url:"http://localhost:8082/clientes/actualizar",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(datosformulario),
			success:function(){alert("El usuario ha sido actualizado");
			document.getElementById("cedula").value="";
			document.getElementById("password").value="";
			document.getElementById("email").value="";
			document.getElementById("nombre").value="";
			document.getElementById("usuario").value="";
			}
	})
});

document.getElementById("btn-consultar").addEventListener('click', function(){
	var clientes = $.ajax({
			type:"GET",
			url:"http://localhost:8082/clientes/buscar/" +document.getElementById("cedula").value,
			success:function(data){
				if(data != null){	
					document.getElementById("direccion").value = data.direccion;
					document.getElementById("email").value = data.correo;
					document.getElementById("nombre").value = data.nombre;
					document.getElementById("telefono").value = data.telefono;
				}else{				
					alert("Cliente no Encontrado");
				}

			}
	})
});


