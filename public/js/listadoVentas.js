var ventasCliente = $.ajax ({
	type:"GET",
	url:"http://localhost:8084/ventas/listar",
	success:function (data){
		table =document.getElementById("tabla");
		var thead = document.createElement("thead");
		thead.setAttribute('id', 'lista');
		thead.innerHTML="<th>Cédula</th><th>Nombre</th><th>Valor Total Ventas</th>";
		var tbody = document.createElement("tbody");
		$.each(data,function(i, item){
			var row = document.createElement("tr");
			row.setAttribute('id', 'lista');
			var cedula = document.createElement("td");
			cedula.innerHTML = item.cedula;	
			var Nombre = document.createElement("td");
			opcion = (item.cedula);
			var clientes = $.ajax({
				type: "GET",
				url: "http://localhost:8082/clientes/buscar/" + opcion,
				success: function (data) {
					if (data.length != 0) {
						$.each(data, function (i, item) {
							Nombre.innerHTML = data.nombre;
						})
					} 
				}
			})
			var Ventas = document.createElement("td");
			Ventas.innerHTML = item.valor_venta;
			
			row.appendChild(cedula);
			row.appendChild(Nombre);
			row.appendChild(Ventas);
			tbody.appendChild(row)
		
		});
		table.appendChild(thead);
		table.appendChild(tbody);						
	}
	
});
