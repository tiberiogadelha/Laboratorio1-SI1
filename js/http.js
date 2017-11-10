var http = require('http');

var artistas = [
		{
			id: "123123123",
			nome: "Elvis Presley",
			estilo: "Rock",
			cartaz: "http://www.elvis.com/assets/images/photos/elvis/1950s/INV16714.jpg",
			favorito: false,
			albuns: [
				{	
					id: "32144",
					titulo: "Nothing but the beat",
					cartazAlbum: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/David_Guetta_-_Nothing_but_the_Beat.png/220px-David_Guetta_-_Nothing_but_the_Beat.png",
					ano: 2016,
					musicas : [
						{
							nomeDaMusica: "without u",
							duracao: 2
						}
					]

				}

			]
		}

]

http.createServer(function (req, res) {
	res.setHeader('Acess-Control-Allow-Origin', '*');
	res.write(JSON.stringify(artistas));
	res.end();
}).listen(3412);