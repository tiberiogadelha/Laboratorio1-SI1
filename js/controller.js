angular.module("Artistas").controller("ArtistasCtrl", function($scope){
	$scope.artistas = [
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
	];

	$scope.artistasFavoritos = [
	]

	

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
				artista.favorito = true;
			}
		});

	}


	$scope.desfavoritarArtista = function(id) {
		angular.forEach($scope.artistasFavoritos, function(artista, i){
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

	$scope.adiciona = function() {
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


});