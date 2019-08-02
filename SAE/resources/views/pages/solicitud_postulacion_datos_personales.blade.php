<!DOCTYPE html>
<html>
<head>
	<title>Solicitud Postulacion</title>
</head>
<body>
	<h1>Solicitud Postulacion</h1>

    <hr>
     <form action="api/postulantes" method="post"  enctype="multipart/form-data">
     {{ csrf_field() }}
     <div class="form-group">
        <label for="title">Apellidos</label>
        <input type="text" class="form-control" id="apellidos"  name="apellidos">
      </div>
      <div class="form-group">
        <label for="title">Nombres</label>
        <input type="text" class="form-control" id="nombres"  name="nombres">
      </div>
      <div class="form-group">
        <label for="title">Cedula</label>
        <input type="text" class="form-control" id="cedula"  name="cedula">
      </div>
      <div class="form-group">
        <label for="title">provincia</label>
        <input type="text" class="form-control" id="provincia"  name="provincia">
      </div>
      <div class="form-group">
        <label for="title">Fecha Nacimiento</label>
        <input type="date" class="form-control" id="fechaNacimiento"  name="fechaNacimiento">
      </div>
      <div class="form-group">
        <label for="title">Correo Electronico</label>
        <input type="email" class="form-control" id="email"  name="email">
      </div>
      <div class="form-group">
        <label for="date">Telefono Fijo</label>
        <input type="text" class="form-control" id="telefijo"  name="telefijo">
      </div>
      <div class="form-group">
        <label for="date">Telefono Celular</label>
        <input type="text" class="form-control" id="telefono"  name="telefono">
      </div>
      <div class="form-group">
        <label for="title">Pais</label>
        <input type="text" class="form-control" id="estado"  name="estado">
      </div>
      <div class="form-group">
        <label for="date">Direccion</label>
        <input type="text" class="form-control" id="direccion"  name="direccion">
      </div>
      <div class="form-group">
        <label for="date">Ciudad</label>
        <input type="text" class="form-control" id="ciudad"  name="ciudad">
      </div>

      <div class="form-group">
      	<label for="text">Disponibilidad para viajar</label>
      	<input type="checkbox" id="disponibilidadViajar" name="disponibilidadViajar" value="1"> Si
  		<input type="checkbox" id="disponibilidadViajar" name="disponibilidadViajar" value="0" checked="checked"> No
      </div>
       <div class="form-group">
        <label for="archivoAnexo">Archivo</label>
        <input type="file" class="form-control" id="archivoAnexo"  name="archivoAnexo">
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
      
</body>
</html>