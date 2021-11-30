function limpiarCampos(){
	document.getElementById("form").reset();
}


limpiarCampos();

document.body.onload = function(){
	var autoincremental = $.ajax ({
		type:"GET", 
		url:"http://localhost:8084/ventas/ventas/listar",
		success:function(data){
			document.getElementById("Consecutivo").value = data.length + 1; 
		
		}
	})
};

document.getElementById("btn-consultar").addEventListener('click', function(){
	
	var  clientes=$.ajax ({
		type:"GET",
		url:"http://localhost:8082/clientes/buscar/"+document.getElementById("cedula").value,
		success:function(data){
			if(data != null){
					$.each(data,function(i, item){
					document.getElementById("NombreCliente").value = data.nombre;						
					})
			}else{
					alert("Cliente no Encontrado");
				 }
		}, 
		error:function(error){
			alert("Ha ocurrido un error!!")			
		}
	});
	
	
	 	 	
});

/*document.getElementById("formulario").addEventListener("submit", (e)=>{
	e.preventDefault();	
});*/

document.getElementById("btn-consultarCodigo1").addEventListener('click', function(){
	var productos=$.ajax ({
		type:"GET",
		url:"http://localhost:8080/productos/buscar/"+document.getElementById("codigo1").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto1").value = data.nombre_producto;
				})
			}else{
				alert ("Producto no encontrado");
			}
		}
	});
});

document.getElementById("btn-consultarCodigo2").addEventListener('click', function(){
	var productos=$.ajax ({
		type:"GET",
		url: "http://localhost:8080/productos/buscar/" + document.getElementById("codigo2").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto2").value = data.nombre_producto;
				})
			}else{
				alert ("Producto no encontrado");
			}
		}
	});
});

document.getElementById("btn-consultarCodigo3").addEventListener('click', function(){
	var productos=$.ajax ({
		type:"GET",
		url: "http://localhost:8080/productos/buscar/" + document.getElementById("codigo3").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto3").value = data.nombre_producto;
				})
			}else{
				alert ("Producto no encontrado");
			}
		}
	});
});

document.getElementById("cantidadProducto1").addEventListener('keypress', function(){
	var operacioncantidad = $.ajax ({
		type: "GET",
		url: "http://localhost:8080/productos/buscar/" + document.getElementById("codigo1").value,
		success:function (data){
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto1").value = document.getElementById("cantidadProducto1").value * data.precio_venta;
					document.getElementById("TotalVentas").value = parseFloat(document.getElementById("valorTotalProducto1").value) + parseFloat(document.getElementById("valorTotalProducto2").value) + parseFloat(document.getElementById("valorTotalProducto3").value);
					document.getElementById("Iva").value = parseFloat(document.getElementById("TotalVentas").value * 0.19).toFixed(2);
					document.getElementById("TotalConIva").value = parseFloat(document.getElementById("Iva").value) + parseFloat(document.getElementById("TotalVentas").value)
				})
			}
		}
	});
});

document.getElementById("cantidadProducto2").addEventListener('keypress', function(){
	var operacioncantidad = $.ajax ({
		type: "GET",
		url: "http://localhost:8080/productos/buscar/" + document.getElementById("codigo2").value,
		success:function (data){
			document.getElementById("TotalVentas").value =0;
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto2").value = document.getElementById("cantidadProducto2").value * data.precio_venta;
					document.getElementById("TotalVentas").value = parseFloat(document.getElementById("valorTotalProducto1").value) + parseFloat(document.getElementById("valorTotalProducto2").value) + parseFloat(document.getElementById("valorTotalProducto3").value) ;
					document.getElementById("Iva").value = parseFloat(document.getElementById("TotalVentas").value * 0.19).toFixed(2);
					document.getElementById("TotalConIva").value = parseFloat(document.getElementById("Iva").value) + parseFloat(document.getElementById("TotalVentas").value)
				})
			}
		}
	});
});

document.getElementById("cantidadProducto3").addEventListener('keypress', function(){
	var operacioncantidad = $.ajax ({
		type: "GET",
		url: "http://localhost:8080/productos/buscar/" + document.getElementById("codigo3").value,
		success:function (data){
			document.getElementById("TotalVentas").value = 0;
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto3").value = document.getElementById("cantidadProducto3").value * data.precio_venta;
					document.getElementById("TotalVentas").value = parseFloat(document.getElementById("valorTotalProducto1").value) + parseFloat(document.getElementById("valorTotalProducto2").value) + parseFloat(document.getElementById("valorTotalProducto3").value);
					document.getElementById("Iva").value = parseFloat(document.getElementById("TotalVentas").value * 0.19).toFixed(2);
					document.getElementById("TotalConIva").value = parseFloat(document.getElementById("Iva").value) + parseFloat(document.getElementById("TotalVentas").value)
				})
			}
		}
	});
});


document.getElementById("btn-confirmar").addEventListener('click', function () {
	let detalleVentas = [];
	if (validador(1))
	{
		let detalleVentas1={
			"cantidad":document.getElementById("cantidadProducto1").value,
			"codigo":document.getElementById("codigo1").value,
			"valorTotal":document.getElementById("valorTotalProducto1").value,
		}
		detalleVentas.push(detalleVentas1);
	}
	if (validador(2)){
		let detalleVentas2={
			"cantidad":document.getElementById("cantidadProducto2").value,
			"codigo":document.getElementById("codigo2").value,
			"valorTotal":document.getElementById("valorTotalProducto2").value,
		}
		detalleVentas.push(detalleVentas2);
	}
	  
	if (validador(3)){
		let detalleVentas3={
			"cantidad":document.getElementById("cantidadProducto3").value,
			"codigo":document.getElementById("codigo3").value,
			"valorTotal":document.getElementById("valorTotalProducto3").value,
		}
		detalleVentas.push(detalleVentas3);
	}

	if (detalleVentas.length >= 1)
	{
		let datosformulario = {
			"codigo_venta": document.getElementById("Consecutivo").value, 
			"cedula": document.getElementById("cedula").value,
			"detalleVentas":detalleVentas,
			"iva_venta": document.getElementById("Iva").value,
			"total_venta": document.getElementById("TotalVentas").value,
			"valor_venta": document.getElementById("TotalConIva").value
		};
$.ajax({
			type:"POST",
			url: "http://localhost:8084/ventas/agregar/venta",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(datosformulario),
			success:function(data){
				alert("La venta ha sido creada");
				limpiarCampos()
				//document.getElementById("Consecutivo").value=data;
			}
		})
	}else
		alert("No se digitó nungún producto")
});

validador = function(identificadoproducto){
	if (document.getElementById("cantidadProducto" + identificadoproducto).value == '' || 
		document.getElementById("codigo" + identificadoproducto).value == '' ||
		document.getElementById("valorTotalProducto" + identificadoproducto).value == '0'){
			return false;
		}	
	return true
}

limpiarCampos = function(){
	document.getElementById("cedula").value ="",
	document.getElementById("NombreCliente").value ="",
	limpiarCamposProd(1),
	limpiarCamposProd(2),
	limpiarCamposProd(3),
	document.getElementById("Iva").value ="0",
	document.getElementById("TotalVentas").value ="0",
	document.getElementById("TotalConIva").value ="0"
}

limpiarCamposProd = function(colmna){
	document.getElementById("cantidadProducto" + colmna).value ="",
	document.getElementById("NombreProducto" + colmna).value ="",
	document.getElementById("codigo" + colmna).value ="",
	document.getElementById("valorTotalProducto" + colmna).value = "0"
}


				//$.ajax({
					//type:"POST",
					//url: "http://localhost:8084/ventas/agregar",
						 	//success:function(){alert("La venta ha sido creada");
							//document.getElementById("cedula").value="";
							//}
						//})				
			//}
		//})


//});
