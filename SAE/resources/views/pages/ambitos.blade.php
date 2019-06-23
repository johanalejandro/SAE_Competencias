<h1> Listado de Ambitos </h1>
	@if(count($ambitos)>1)
		@foreach($ambitos as $ambito)
			<div> 
				<p> {{$ambito->nombreAmbito}}</p>

			</div>
		@endforeach
	@else
		<p> Nothing found</p>
	@endif