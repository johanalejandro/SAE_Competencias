<!DOCTYPE html>
<html>
<head>
	<title>Solicitud Postulacion</title>
</head>
<body>
	<h1>Solicitud Postulacion</h1>

    <hr>
     <form action="/tasks" method="post">
     {{ csrf_field() }}
     <div class="form-group">
        <label for="title">Apellidos</label>
        <input type="text" class="form-control" id="apellidos"  name="apellidos">
      </div>
      <div class="form-group">
        <label for="title">Nombres</label>
        <input type="text" class="form-control" id="nombre"  name="nombre">
      </div>
      <div class="form-group">
        <label for="title">Fecha Nacimiento</label>
        <input type="date" class="form-control" id="fecNac"  name="fecNac">
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
        <input type="text" class="form-control" id="telecel"  name="telecel">
      </div>
      <div class="form-group">
        <label for="title">Pais</label>
        <input type="text" class="form-control" id="pais"  name="pais">
      </div>
      <div class="form-group">
        <label for="date">Direccion</label>
        <input type="text" class="form-control" id="direccion"  name="direccion">
      </div>
      <div class="form-group">
      	<label for="text">Disponibilidad para viajar</label>
      	<input type="checkbox" name="viajar" value="Si"> Si
  		<input type="checkbox" name="viajar" value="No" checked="checked"> No
      </div>
      <div class="form-group">
      	 <label for="text">Genero</label>
      	<input type="checkbox" name="genero" value="masculino"> Masculino
  		<input type="checkbox" name="genero" value="femenino" checked="checked"> Femenino
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
      
</body>
</html>