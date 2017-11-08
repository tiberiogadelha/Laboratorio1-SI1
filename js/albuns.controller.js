angular.module("Albuns").controller("AlbunsController", function($scope){

	$scope.titulo = "Álbuns no sistema";

	$scope.albuns = [
		{
			id: "4321437826423",
			titulo: "Nothing but the beat",
			artista: "David Guetta",
			ano: 2011,
			cartaz: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/David_Guetta_-_Nothing_but_the_Beat.png/220px-David_Guetta_-_Nothing_but_the_Beat.png",
			musicas: [
				{
					nomeDaMusica: "without u",
					duracao: 2
				}
			]

		}

	]


	$scope.novaMusica = {};
	$scope.novoAlbum = {};

	$scope.adiciona = function() {
		var newMusica = angular.copy($scope.novaMusica);
		var newAlbum = angular.copy($scope.novoAlbum);
		newAlbum.id = Date.now();
		newAlbum.musicas = [];

		var seguro = "ok";
		var albumAux = null;

		//Verifica se os campos estao validos
		if(!newMusica.nomeDaMusica & !newMusica.duracao & !newAlbum.titulo & !newAlbum.artista & !newAlbum.ano & !newAlbum.cartaz) {
			window.alert("Preencha todos os campos!");
			return;
		}


		var album = pesquisaAlbum(newAlbum.titulo);

		if(album == null) {
			newAlbum.musicas.push(newMusica);
			$scope.albuns.push(newAlbum);
			window.alert("Música cadastrada com sucesso!");
		} else {
			adicionaMusica(album, newMusica);
			window.alert("Música cadastrada com sucesso!");
		}
		
		$scope.novoAlbum = {};
		$scope.novaMusica = {};


	}
	

	
	pesquisaAlbum = function(titulo) {
		var albumPesquisado = null;
		angular.forEach($scope.albuns, function(album) {
			if(album.titulo == titulo) {
				albumPesquisado = album;
			}
		});

		return albumPesquisado;
	}

	adicionaMusica = function(album, newMusica) {
		if(pesquisaMusicaNoAlbum(album, newMusica.nomeDaMusica) == false) {
			album.musicas.push(newMusica);
		} else {
			window.alert("A música já existe no álbum.");
		}
	}

	pesquisaMusicaNoAlbum = function(album, titulo) {
		var musicaExiste = false;
		angular.forEach(album.musicas, function(musica) {
			if(musica.nomeDaMusica == titulo) {
				musicaExiste = true;
			}
		});

		return musicaExiste;
	}


	

	
});