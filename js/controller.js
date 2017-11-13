angular.module("Artistas").controller("ArtistasCtrl", function($scope){

	$scope.artistas = [ 
		{
			id: "2321321",
			nome: "Elvis Presley",
			estilo: "Rock",
			cartaz: "http://www.elvis.com/assets/images/photos/elvis/1950s/INV16714.jpg",
			favorito: false,
			ultimaMusicaOuvida: "Can't Help Falling In Love",
			albuns: [
				{
					id: "3100",
					titulo: "Blue Hawaii",
					cartazAlbum: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Elvisbluehawaiisoundtrack.jpg/220px-Elvisbluehawaiisoundtrack.jpg",
					ano: 1961,
					musicas: [
						{
							nomeDaMusica: "Can't Help Falling In Love",
							duracao: 3,
							artista: "Elvis Presley"
						}
					]
				}
			]
		},
		{
			id: "9221",
			nome: "David Guetta",
			estilo: "Eletrônica",
			cartaz: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/David_Guetta_2013-04-12_001.jpg/1200px-David_Guetta_2013-04-12_001.jpg",
			favorito: true,
			ultimaMusicaOuvida: "Without you",
			albuns: [
				{
					id: "2911111",
					titulo: "Nothing but the beat",
					cartazAlbum: "https://images-na.ssl-images-amazon.com/images/I/91OKWPQcuEL._SL1500_.jpg",
					ano: 2010,
					musicas: [
						{
							nomeDaMusica: "Without you",
							duracao: 3,
							artista: "David Guetta"
						}
					]
				},
				{
					id: "116311",
					titulo: "Listen Again",
					cartazAlbum: "https://is2-ssl.mzstatic.com/image/thumb/Music62/v4/bf/a5/91/bfa59136-c2f6-b744-dcd0-5bd3f16e332e/mzm.iudugxpn.jpg/1200x630bb.jpg",
					ano: 2014,
					musicas: [
						{	
							nomeDaMusica: "Dangerous",
							duracao: 4,
							artista: "David Guetta"
						},
						{
							nomeDaMusica: "What I did for love",
							duracao: 3,
							artista: "David Guetta"
						}

					]

				}
			]

		},
		{
			id: "17422",
			nome: "Anitta",
			estilo: "Pop/Funk",
			cartaz: "https://s1.vagalume.com/anitta/images/profile-bigw314.jpg",
			favorito: true,
			ultimaMusicaOuvida: "",
			albuns: [
				{
					id: "119423",
					titulo: "Bang",
					cartazAlbum: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Anitta_bang.jpg/220px-Anitta_bang.jpg",
					ano: 2015,
					musicas: [
						{
							nomeDaMusica: "Bang",
							duracao: 3,
							artista: "Anitta"
						},

						{
							nomeDaMusica: "Deixa ele sofrer",
							duracao: 4,
							artista: "Anitta"
						}

					]
				}

			]

		}


	];

	$scope.playlists = [
		{
			nomeDaPlaylist: "Melhores de 2018",
			duracao: 3,
			cartaz: "https://http2.mlstatic.com/forma-carinha-feliz-smile-12-cavidades-em-aluminio-D_NQ_NP_433711-MLB20614913319_032016-O.jpg",
			musicas: [
				{
					nomeDaMusica: "Without you",
					duracao: 3,
					artista: "David Guetta"
				}
			]
		}


	]
		

	$scope.novaPlaylist = {};
	$scope.novoArtista = {};
	$scope.novaMusica = {};
	$scope.novoAlbum = {};




	// Recebe como parametro o id de um artista, depois remove o artista que tem aquele id.
	$scope.removerArtista = function(id) {
	
		angular.forEach($scope.artistas, function(artista, i){
			if(artista.id == id){
				$scope.artistas.splice(i, 1);
			}
		});
	}

	// Adiciona um novo artista ao sistema, cujo dados foram passados em novoArtista.html
	$scope.adicionarArtista = function(){
		var artista = angular.copy($scope.novoArtista);
		var seguro = "ok";

		artista.albuns = [];
		artista.ultimaMusicaOuvida = "";
		artista.favorito = false;
		artista.albuns.musicas = [];
		artista.id = Date.now();

		//Verifica se o artista ja foi adicionado ao sistema
		if(!artista.nome) {
			window.alert("Preencha ao menos o campo: nome do artista.");
			return;
		}

		angular.forEach($scope.artistas, function(artista1){
			if(artista1.nome == artista.nome){
				seguro = "false";
			}
		});
		
		//Adiciona o artista ao sistema
		if(seguro == "ok"){
			$scope.artistas.push(artista);
			window.alert("Artista cadastrado com sucesso.")
		} else {
			window.alert("O artista já existe no sistema.")
		}

		$scope.novoArtista = {};
	}	

	// Torna um artista como sendo favorito, recebendo o id como parâmetro.
	$scope.adicionarFavorito = function(id) {
		angular.forEach($scope.artistas, function(artista){
			if(artista.id == id){

				if(artista.favorito == true) {
					window.alert("O artista já está como favorito.");
					return;
				} 

				artista.favorito = true;
			}
		});

	}

	// Tira o status de favorito de um artista, recebendo o id como parâmetro.
	$scope.desfavoritarArtista = function(id) {
		angular.forEach($scope.artistas, function(artista){
			if(artista.id == id){
				artista.favorito = false;
			}
		});
	}


	 // Retorna o artista que tem o nome passado pelo parâmetro, e null caso o artista não exista no sistema.
	buscaArtista = function(nome) {
		var artistaProcurado = null;

		angular.forEach($scope.artistas, function(artista) {
			if(artista.nome == nome) {
				artistaProcurado = artista;
			}
		});

		return artistaProcurado;
	}

	/* Adiciona uma nova música e/ou Álbum. 
	* Depende se o álbum passado em novaMusica.html já existe.
	*/
	$scope.adicionaMusicaEAlbum = function() {
		var newMusica = angular.copy($scope.novaMusica);
		var newAlbum = angular.copy($scope.novoAlbum);


		newAlbum.id= Date.now;
		newAlbum.musicas = [];

		if(!newMusica.nomeDaMusica || !newMusica.duracao || !newAlbum.titulo || !newAlbum.artista || !newAlbum.ano || !newAlbum.cartazAlbum) {
			window.alert("Preencha todos os campos!");
			return;
		}

		var artista = buscaArtista(newAlbum.artista.nome);
		var album = buscaAlbum(newAlbum.titulo, artista);
		newMusica.artista = artista.nome;

		//1º caso: Album ainda nao existe no sistema
		if(album == null) {
			newAlbum.musicas.push(newMusica);
			artista.albuns.push(newAlbum);
			window.alert("Música cadastrada com sucesso!");

		//2º caso: áLbum já existe no sistema
		} else {
			// Caso a música não exista no álbum.
			if(pesquisaMusicaNoAlbum(album, newMusica.nomeDaMusica) == false) {
				album.musicas.push(newMusica);
				window.alert("Música cadastrada com sucesso!");
			} else {
				window.alert("A música já foi cadastrada no sistema!");
			}

		}

		$scope.novoAlbum = {};
		$scope.novaMusica = {};
	}


	// Procura um álbum de determinado artista, e o retorna, caso for encontrado. Se não, retorna null.
	buscaAlbum = function(tituloDoAlbum, artista) {
		var albumProcurado = null;
		
		angular.forEach(artista.albuns, function(album) {
			if(album.titulo == tituloDoAlbum) {
				albumProcurado = album;
			}
		});
		

		return albumProcurado;
	}

	// Verifica se determinada música já foi cadastrada no álbum.
	pesquisaMusicaNoAlbum = function(album, nomeDaMusica) {
		var ehRepetida = false;
		angular.forEach(album.musicas, function(musica) {
			if(musica.nomeDaMusica == nomeDaMusica) {
				ehRepetida = true;
			}
		});

		return ehRepetida;
	}

	// Remove determinado álbum do sistema.
	$scope.removerAlbum = function(artista, titulo) {
		angular.forEach(artista.albuns, function(album, i){
			if(album.titulo == titulo){
				artista.albuns.splice(i, 1);
			}
		});
	}

	//Adiciona uma nova playlist ao sistema, ou então, adiciona apenas a música desejada, caso a playlist já exista.
	$scope.adicionarPlaylist = function() {
		var playlist = angular.copy($scope.novaPlaylist);
		playlist.duracao = 0;
		playlist.musicas = [];
		

		if(!playlist.nomeDaPlaylist || !playlist.musica || !playlist.cartaz) {
			window.alert("Preencha todos os campos");
			return;
		}

		var playlistAtual = buscaPlaylist(playlist.nomeDaPlaylist);
		var novaMusica = buscaMusicaNoSistema(playlist.musica);

		// Se a playlist não existe, ela é criada.
		if(playlistAtual == null) {
			if(novaMusica != null) {
				playlist.musicas.push(novaMusica);
				playlist.duracao = novaMusica.duracao;
				$scope.playlists.push(playlist);
				window.alert("PlayList criada com sucesso!");

			} else {
				window.alert("A música ainda não foi cadastrada no sistema!");
				
			}

		// Se existe, apenas a música é adicionada à playlist.
		} else {
			if(novaMusica != null) {
				if(musicaEhRepetida(playlistAtual, playlist.musica) == true) {
					window.alert("A música já está na playlist.");
				} else {
					playlistAtual.duracao += novaMusica.duracao;
					playlistAtual.musicas.push(novaMusica);
					window.alert("Nova música adicionada na playlist: " + playlistAtual.nomeDaPlaylist);
				}
			} else {
				window.alert("A música ainda não foi cadastrada no sistema!");
			}
		}

		$scope.novaPlaylist = {};
	}

	// Procura determinada música no sistema, através do seu nome.
	buscaMusicaNoSistema = function(nome) {
		var musicaProcurada = null;


		angular.forEach($scope.artistas, function(artista) {
			angular.forEach(artista.albuns, function(album) {
				angular.forEach(album.musicas, function(musica) {
					if(musica.nomeDaMusica == nome) {
						musicaProcurada = musica;
					}
				});
			});
		});

		registraMusicaOuvida(musicaProcurada);
		return musicaProcurada;
	}

	// Busca uma playlist no sistema, cujo nome foi passado como parâmetro. Se a playlist existir, a mesma é retornada. Se não, null é retornado.
	buscaPlaylist = function(nome) {
		var playlistProcurada = null;

		angular.forEach($scope.playlists, function(playlistAtual) {
			if(playlistAtual.nomeDaPlaylist == nome) {
				playlistProcurada = playlistAtual;
				
			}
		});

		return playlistProcurada;
	}

	// Verifica se determinada música já está numa playlist.
	musicaEhRepetida = function(playlist, nomeDaMusica) {
		var ehRepetida = false;

		angular.forEach(playlist.musicas, function(musica) {
		
			if(musica.nomeDaMusica == nomeDaMusica) {
				ehRepetida = true;
			}
		});
			
		return ehRepetida;
	}

	// Registra a última música de um artista ouvida por um usuário 
	registraMusicaOuvida = function(musica) {
		if(musica != null) {
			var artista = buscaArtista(musica.artista);
			artista.ultimaMusicaOuvida = musica.nomeDaMusica;
		}
	}

	// Remove uma música de uma playlist
	$scope.removerMusicaDaPlaylist = function(nomeDaPlaylist, nomeDaMusica) {
		var playlist = buscaPlaylist(nomeDaPlaylist);

		angular.forEach(playlist.musicas, function(musica,i) {
			if(musica.nomeDaMusica == nomeDaMusica) {
				playlist.duracao -= musica.duracao;
				playlist.musicas.splice(i,1);

			}
		});
	}
	



	

});