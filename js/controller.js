angular.module("Artistas").controller("ArtistasCtrl", function($scope, $http){
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

	$scope.removerArtista = function(id) {
	
		angular.forEach($scope.artistas, function(artista, i){
			if(artista.id == id){
				$scope.artistas.splice(i, 1);
			}
		});
	}

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


	$scope.desfavoritarArtista = function(id) {
		angular.forEach($scope.artistas, function(artista){
			if(artista.id == id){
				artista.favorito = false;
			}
		});
	}
	 // problema AQUI
	buscaArtista = function(nome) {
		var artistaProcurado = null;

		angular.forEach($scope.artistas, function(artista) {
			if(artista.nome == nome) {
				artistaProcurado = artista;
			}
		});

		return artistaProcurado;
	}

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

	buscaAlbum = function(tituloDoAlbum, artista) {
		var albumProcurado = null;
		
		angular.forEach(artista.albuns, function(album) {
			if(album.titulo == tituloDoAlbum) {
				albumProcurado = album;
			}
		});
		

		return albumProcurado;
	}

	pesquisaMusicaNoAlbum = function(album, nomeDaMusica) {
		var ehRepetida = false;
		angular.forEach(album.musicas, function(musica) {
			if(musica.nomeDaMusica == nomeDaMusica) {
				ehRepetida = true;
			}
		});

		return ehRepetida;
	}

	$scope.removerAlbum = function(artista, titulo) {
		angular.forEach(artista.albuns, function(album, i){
			if(album.titulo == titulo){
				artista.albuns.splice(i, 1);
			}
		});
	}

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

		if(playlistAtual == null) {
			if(novaMusica != null) {
				playlist.musicas.push(novaMusica);
				playlist.duracao = novaMusica.duracao;
				$scope.playlists.push(playlist);
				window.alert("PlayList criada com sucesso!");

			} else {
				window.alert("A música ainda não foi cadastrada no sistema!");
				
			}
			
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

	//
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

	buscaPlaylist = function(nome) {
		var playlistProcurada = null;

		angular.forEach($scope.playlists, function(playlistAtual) {
			if(playlistAtual.nomeDaPlaylist == nome) {
				playlistProcurada = playlistAtual;
				
			}
		});

		return playlistProcurada;
	}

	musicaEhRepetida = function(playlist, nomeDaMusica) {
		var ehRepetida = false;

		angular.forEach(playlist.musicas, function(musica) {
		
			if(musica.nomeDaMusica == nomeDaMusica) {
				ehRepetida = true;
			}
		});
			
		return ehRepetida;
	}

	registraMusicaOuvida = function(musica) {
		if(musica != null) {
			var artista = buscaArtista(musica.artista);
			artista.ultimaMusicaOuvida = musica.nomeDaMusica;
		}
	}
	



	

});