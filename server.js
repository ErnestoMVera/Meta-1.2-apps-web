const http = require('http')
http.createServer((req, res) => {
	res.writeHead(200, {'content-type': 'text/html'});
	if(req.method == "POST") {
		datos = "";
		req.on("data", (data) => { datos += data} );
		header = JSON.stringify(req.rawHeaders);
		req.on("end", () => {
			res.end(`
			<!DOCTYPE html>
			<html>
			<head> 
				<title> Formulario </title>
			</head>
			<body> 
				<h1> Datos recibidos: <bl> ${datos} <bl> </h1>
					
				<br></br>
				<h2><bl>Metodo POST</bl><h2>
				<br></br>
				<h2>Cabecera:<h2>
				<br></br>
				
				${header}
			</body>
			</html>`);
		});
	}
	else if(req.method == "GET" && req.url != '/') {
		res.end(`
			<!DOCTYPE html>
			<html>
			<head> 
				<title> Formulario </title>
			</head>
			<body> 
				<h1> Datos recibidos: <bl> ${req.url} <bl> </h1>
				
				<br></br>
				<h2><bl>Metodo GET</bl><h2>
				<br></br>
				<br></br>
				<h2>Cabecera:<h2>
				<br></br>
				
				${req.rawHeaders}
			</body>
			</html>`);
	}
	else {
		res.end(`<!DOCTYPE html>
			<html>
			<head> 
				<title> Formulario </title>
			</head>
			<body> Hola mundo 
			<form action="/" method="POST">
				<div>
					<label for="to">Datos por enviar.</label>
					<input name="datos" id="to" value="">
				</div>
				<div>
					<button>Envialo mi pana</button>
				</div>
			</form>
			</body>
			</html>`);
	}
}).listen(3000);
