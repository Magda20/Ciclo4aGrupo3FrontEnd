const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', (e) =>{ 
	e.preventDefault(); 
	var datosformulario = new FormData();
	var archivos = $("#selectedFile")[0].files // convierte el archivo que se subio en datos validos para enviar al servidor
	
	if(archivos.length > 0)
	{
		var archivoSubido = archivos[0];
		if (archivoSubido.name.endsWith(".csv"))
		{
			datosformulario.append('file',archivoSubido);
			$.ajax({
				type:"POST",
				url:"http://localhost:8080/productos/subirArchivoCSV",
				data:datosformulario,
				processData: false,
	            contentType: false,
			})
			.done(function(respuesta){ // si es exitoso
				 alert(respuesta);	
			})
			.fail(function(){
				alert("Error datos leidos invalidos");
			});	
		}
		else
		{
			alert("Error formato de archivo invalido");			
		}
					
	}
	else
	{
		alert("Error no se selecciono archivo para cargar");
	}
});
$("#selectedFile").change(function(){
	var archivos = $("#selectedFile")[0].files;
	var archivoSubido = archivos[0];
	$("#lablenombrearchivo")[0].value = archivoSubido.name; 
});
