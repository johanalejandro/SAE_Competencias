<!DOCTYPE html>
<html>
<head>
	<title>Solicitud Postulacion</title>
</head>
<body>
	<h1>Solicitud Postulacion</h1>

    <hr>
     <form action="api/crearNuevaSolicitud" method="post"  enctype="multipart/form-data">
     {{ csrf_field() }}
     <div class="form-group">
        <label for="title">IDP</label>
        <input type="text" class="form-control" id="id_postulante"  name="id_postulante">
      </div>
      <div class="form-group">
        <label for="title">IDR</label>
        <input type="text" class="form-control" id="id_usuario"  name="id_usuario">
      </div>
      
       
      <button type="submit" class="btn btn-primary">Guardar</button>
      
</body>
</html>