<!DOCTYPE html>
<html>
<head>
	<title>Solicitud Postulacion</title>
</head>
<body>
	<h1>Solicitud Postulacion</h1>

    <hr>
     <form action="api/experienciasEvaluador" method="post"  enctype="multipart/form-data">
     {{ csrf_field() }}
      <div class="form-group">
        <label for="title">cedula</label>
        <input type="text" class="form-control" id="cedula"  name="cedula">
      </div>
      <div class="form-group">
        <label for="title">id</label>
        <input type="text" class="form-control" id="id_sector_requerimiento"  name="id_sector_requerimiento">
      </div>
       <div class="form-group">
        <label for="title">descripcion</label>
        <input type="text" class="form-control" id="descripcion"  name="descripcion">
      </div>
      <div class="form-group">
        <label for="title">nombre</label>
        <input type="text" class="form-control" id="nombreEmpresa"  name="nombreEmpresa">
      </div>
      <div class="form-group">
        <label for="title">cargo</label>
        <input type="text" class="form-control" id="cargoEjercido"  name="cargoEjercido">
      </div>
      <div class="form-group">
        <label for="date">fechaInicio</label>
        <input type="date" class="form-control" id="fecha_inicio"  name="fecha_inicio">
      </div>
      <div class="form-group">
        <label for="date">fechaFin</label>
        <input type="date" class="form-control" id="fecha_fin"  name="fecha_fin">
      </div>
      <div class="form-group">
        <label for="title">trabajoActual</label>
        <input type="text" class="form-control" id="esTrabajoActual"  name="esTrabajoActual">
      </div>
       
      <button type="submit" class="btn btn-primary">Guardar</button>

      <a href="{{ url('api/verSolicitudPorUsuario/') }}" class="btn btn-xs btn-info pull-right">Edit</a>
      
</body>
</html>