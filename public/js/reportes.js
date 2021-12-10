document.getElementById("btn-lista-clientes").onclick = function(){
	var clientes = $.ajax ({
		type : "GET",
		url : "http://localhost:8082/clientes/listar",
		success : function(data){
			table = document.getElementById("table");
			var thead = document.createElement("thead");
			thead.setAttribute('class', 'menu');
			thead.innerHTML = '<tr class="bg-secondary text-light text-center">'+
								"<th>Cedula</th>"+
								"<th>Nombre</th>"+
								"<th>Correo Electronico</th>"+
								"<th>Direccion</th>"+
								"<th>Telefono</th>"+
							"</tr>";
			var tbody = document.createElement("tbody");
			$.each(data, function(i, item){
				var row = document.createElement("tr");
				var cedula = document.createElement("td");
				cedula.innerHTML = item.cedula
				var nombre = document.createElement("td");
				nombre.innerHTML = item.nombre
				var dir = document.createElement("td");
				dir.innerHTML = item.direccion
				var correo = document.createElement("td");
				correo.innerHTML = item.correo
				var telefono = document.createElement("td");
				telefono.innerHTML = item.telefono
				row.appendChild(cedula)
				row.appendChild(nombre)
				row.appendChild(dir)
				row.appendChild(correo)
				row.appendChild(telefono)
				tbody.appendChild(row)
			})
			table.innerHTML = ""
			table.append(thead)
			table.append(tbody)
		}
	})
}

document.getElementById("btn-lista-ventasCliente").onclick = function(){
var ventasCliente = $.ajax ({
	type:"GET",
	url:"http://localhost:8084/ventas/listarCedula",
	success:function (data){
		table =document.getElementById("table");
		var thead = document.createElement("thead");
		thead.setAttribute('id', 'lista');
		thead.innerHTML=
		'<tr class="bg-secondary text-light text-center ">'+
		"<th>Cédula</th>"+
		"<th>Nombre</th>"+
		"<th>Valor Total Ventas</th>"+
		"</tr>";
		
		var tbody = document.createElement("tbody");
		$.each(data,function(i, item){
			var row = document.createElement("tr");
			row.setAttribute('id', 'lista');
			var cedula = document.createElement("td");
			cedula.innerHTML = item.cedula;	
			var Nombre = document.createElement("td");
			var nombres = $.ajax({
				type:"GET",
				url:"http://localhost:8082/clientes/buscar/"+item.cedula,
				success:function(data){
					Nombre.innerHTML = data.nombre;
				}
			})	
			var Ventas = document.createElement("td");
			Ventas.innerHTML = item.totalVentas;
			
			row.appendChild(cedula);
			row.appendChild(Nombre);
			row.appendChild(Ventas);
			tbody.appendChild(row)
		
		});
		table.innerHTML = ""
		table.appendChild(thead);
		table.appendChild(tbody);						
    }
})
}