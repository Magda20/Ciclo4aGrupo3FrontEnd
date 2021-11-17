document.getElementById("btn-consultar").addEventListener('click', function(){
	var  clientes=$.ajax ({
		type:"GET",
		url:"http://localhost:8080/consultarClientes?cedula="+document.getElementById("cedula").value,
		success:function(data){
			if(data.length != 0){
					$.each(data,function(i, item){
					document.getElementById("NombreCliente").value = item.nombre;						
					})
			}else{
					alert("Cliente no Encontrado");
				 }
		}		
	});
	
	
	 	 	
});

document.getElementById("formulario").addEventListener("submit", (e)=>{
	e.preventDefault();	
});

document.getElementById("btn-consultarCodigo1").addEventListener('click', function(){
	var productos=$.ajax ({
		type:"GET",
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo1").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto1").value = item.nombre;
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
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo2").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto2").value = item.nombre;
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
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo3").value,
		success:function (data){
			if(data.length !=0){
				$.each(data,function(i, item){
					document.getElementById("NombreProducto3").value = item.nombre;
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
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo1").value,
		success:function (data){
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto1").value = document.getElementById("cantidadProducto1").value * item.precioVenta;
				})
			}
		}
	});
});

document.getElementById("cantidadProducto2").addEventListener('keypress', function(){
	var operacioncantidad = $.ajax ({
		type: "GET",
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo2").value,
		success:function (data){
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto2").value = document.getElementById("cantidadProducto2").value * item.precioVenta;
				})
			}
		}
	});
});

document.getElementById("cantidadProducto3").addEventListener('keypress', function(){
	var operacioncantidad = $.ajax ({
		type: "GET",
		url:"http://localhost:8080/consultarProducto?codigoProducto="+document.getElementById("codigo3").value,
		success:function (data){
			if(data.lenght !=0){
				$.each(data,function(i, item){
					document.getElementById("valorTotalProducto3").value = document.getElementById("cantidadProducto3").value * item.precioVenta;
				})
			}
		}
	});
});

document.getElementById("TotalVentas").addEventListener('focus', function(){
	document.getElementById("TotalVentas").value = parseFloat(document.getElementById("valorTotalProducto1").value) + parseFloat(document.getElementById("valorTotalProducto2").value) + parseFloat(document.getElementById("valorTotalProducto3").value)	;
	});
document.getElementById("Iva").addEventListener('focus', function(){
	document.getElementById("Iva").value = document.getElementById("TotalVentas").value*0.19;
});
document.getElementById("TotalConIva").addEventListener('focus', function(){
	document.getElementById("TotalConIva").value = parseFloat(document.getElementById("Iva").value) +parseFloat(document.getElementById("TotalVentas").value) 
});

document.getElementById("btn-confirmar").addEventListener('click', function(){
// Obtener el usuario logeado
var nombre = sessionStorage.getItem("nombre");

$.ajax({
	type:"POST",
	url:"http://localhost:8080/agregarVenta?cedulaCliente="+ document.getElementById("cedula").value+"&nombreUsuario="+ nombre+"&codigoVenta=0&valor_total="+ document.getElementById("TotalConIva").value +"&valor_venta="+ document.getElementById("TotalVentas").value +"&valoriva="+ document.getElementById("Iva").value,
			success:function(data){
				//alert("La venta ha sido creada");
				document.getElementById("Consecutivo").value=data;
				
				$.ajax({
					type:"POST",
					url:"http://localhost:8080/agregarDetalleVenta?codigoProducto="+ document.getElementById("codigo1").value+"&cantidadProducto="+ document.getElementById("cantidadProducto1").value+"&codigoVenta="+ data +"&valorTotal="+document.getElementById("TotalConIva").value +"&valorVenta="+ document.getElementById("TotalVentas").value +"&valorIva="+ document.getElementById("Iva").value,
						 	success:function(){alert("La venta ha sido creada");
							document.getElementById("cedula").value="";
							}
						})				
			}
		})


});
