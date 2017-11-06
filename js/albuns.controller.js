angular.module("Albuns").controller("AlbunsController", function($scope){

	$scope.titulo = "Albuns do sistema";

	$scope.albuns = [
		{
			id = "3286237642";
			nomeDoAlbum = "Nothing else";
			artista = "Elvis";
			anoDeLancamento = 2009;
			capaDoAlbum = "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/David_Guetta_-_Nothing_but_the_Beat.png/220px-David_Guetta_-_Nothing_but_the_Beat.png"
			$scope.musicas = [
				{
					nomeDaMusica = "oi";
					duracao = 2;

				}
			];
		}
	];

	%scope.musicas = [
		{
			titulo = "oi";
			duracao = 2;
		}
	]

	$scope.novoAlbum = {};
	$scope.novaMusica = {};

	$scope.adicionaAlbum = function() {
		var album = angular.copy($scope.novoAlbum);
		$scope.albuns.push(album);
		$scope.novoAlbum = {};
	}

	$scope.adicionaMusica = function() {
		var album = angular.copy($scope.novoAlbum);
		var musica = angular.copy($scope.novaMusica);
		angular.forEach($scope.albuns, function(album1)) {
			if(album1.nomeDoAlbum == album.nomeDoAlbum) {
				//fazer o for para ver se a musica existe.
				album.$scope.musicas.push(musica);
			}
		}
		$scope.novaMusica = {};
	}

});