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
        <label for="title">IDP</label>
        <input type="text" class="form-control" id="id_sector_requerimiento"  name="id_sector_requerimiento">
      </div>
      <div class="form-group">
        <label for="title">IDR</label>
        <input type="text" class="form-control" id="descripcion"  name="descripcion">
      </div>
      <div class="form-group">
        <label for="title">NombreInst</label>
        <input type="text" class="form-control" id="nombreEmpresa"  name="nombreEmpresa">
      </div>
      <div class="form-group">
        <label for="title">Horas</label>
        <input type="text" class="form-control" id="cargoEjercido"  name="cargoEjercido">
      </div>

      <div class="form-group">
        <label for="title">fecini</label>
        <input type="date" class="form-control" id="fecha_inicio"  name="fecha_inicio">
      </div>

      <div class="form-group">
        <label for="title">fecfin</label>
        <input type="date" class="form-control" id="fecha_fin"  name="fecha_fin">
      </div>
      
       <div class="form-group">
        <label for="archivoAnexo">Archivo</label>
        <input type="file" class="form-control" id="archivoAnexo"  name="archivoAnexo">
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
      
</body>
</html>