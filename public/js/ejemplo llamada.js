const http = require("http");



formulario.addEventListener('submit', (e) =>{
    e.preventDefault(); //no permite que el usuario envie el formulario
    var usuarios = http.post("http://localhost:8080/agregarProveedores?ciudadProveedor="+ document.getElementById("ciudad").value+"&direccionProveedor="+ document.getElementById("direccion").value+"&nitProveedor="+ document.getElementById("nit").value+"&nombreProveedor="+ document.getElementById("nombre").value+"&telefonoProveedor="+ document.getElementById("telefono").value
    ,(resp) => {
            alert("El Proveedor ha sido creado");
			document.getElementById("nit").value="";
			document.getElementById("direccion").value="";
			document.getElementById("nombre").value="";
			document.getElementById("ciudad").value="";
			document.getElementById("telefono").value="";
			
    }
    );
    const buscarProducto = () => {
        http
        .get("http://localhost:8080/api/tutorials", (resp) => {
          let data = "";
          // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
          resp.on("data", (chunk) => {
            data += chunk;
          });
      
          // when the whole response is received, parse the result and Print it in the console
          resp.on("end", () => {
            console.log(JSON.parse(data));
          });
        })
        .on("error", (err) => {
          console.log("Error: " + err.message);
        });
    }
});

formulario.addEventListener('submit', (e) =>{ //función de tipo flecha=>, (e) parametro que es el evento
	e.preventDefault(); //no permite que el usuario envie el formulario
	event.preventDefault();
	var usuarios = $.ajax({
		type:"POST",
		url:"http://localhost:8080/agregarProveedores?ciudadProveedor="+ document.getElementById("ciudad").value+"&direccionProveedor="+ document.getElementById("direccion").value+"&nitProveedor="+ document.getElementById("nit").value+"&nombreProveedor="+ document.getElementById("nombre").value+"&telefonoProveedor="+ document.getElementById("telefono").value,
			success:function(){alert("El Proveedor ha sido creado");
			document.getElementById("nit").value="";
			document.getElementById("direccion").value="";
			document.getElementById("nombre").value="";
			document.getElementById("ciudad").value="";
			document.getElementById("telefono").value="";
			}
		})