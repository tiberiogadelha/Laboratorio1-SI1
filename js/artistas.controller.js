angular.module("Artistas").controller("ArtistasController", function($scope){
	$scope.titulo = "Artistas Favoritos";

	$scope.artistas = [
		{
			id: "123123123",
			nome: "Elvis Presley",
			cartaz: "http://www.elvis.com/assets/images/photos/elvis/1950s/INV16714.jpg"
		}
	];

	$scope.novoArtista = {};

	$scope.removerArtista = function(id) {
		angular.forEach($scope.artistas, function(artista, i){
			if(artista.id == id){
				$scope.artistas.splice(i, 1);
			}
		});
	}

	$scope.adicionarArtista = function(){
		var artista = angular.copy($scope.novoArtista);
		artista.id = Date.now();
		$scope.artistas.push(artista);

		$scope.novoArtista = {};
	}
});