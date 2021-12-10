var clientes = $.ajax({
    type:"GET",
    url:"http://localhost:8082/clientes/listar",
    success:function(data){
        table =document.getElementById("tabla");
        var thead = document.createElement("thead");
        thead.setAttribute('id', 'lista');
        thead.innerHTML = "<th>Cédula</th><th>Nombre</th><th>Email</th><th>Dirección</th><th>Teléfono</th>";
        var tbody = document.createElement("tbody");
        $.each(data,function(i, item){
            var row = document.createElement("tr");
            row.setAttribute('id', 'lista');
            var cedula = document.createElement("td");
            cedula.innerHTML = item.cedula;
            var nombre= document.createElement("td");
            nombre.innerHTML = item.nombre; 
            var email= document.createElement("td");
            email.innerHTML = item.correo;
            var direccion= document.createElement("td");
            direccion.innerHTML = item.direccion;
            var telefono= document.createElement("td");
            telefono.innerHTML = item.telefono;
            
            row.appendChild(cedula);				
            row.appendChild(nombre);
            row.appendChild(email);
            row.appendChild(direccion);
            row.appendChild(telefono);
            tbody.appendChild(row)		
        });
        table.appendChild(thead);
        table.appendChild(tbody);
    }
});