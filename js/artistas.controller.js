angular.module("Artistas").controller("ArtistasController", function($scope){
	$scope.titulo = "Artistas no sistema";

	$scope.artistas = [
		{
			id: "123123123",
			nome: "Elvis Presley",
			estilo: "Rock",
			cartaz: "http://www.elvis.com/assets/images/photos/elvis/1950s/INV16714.jpg",
			albuns: []
		}
	];

	$scope.artistasFavoritos = [
	]

	

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
		var seguro = "ok";
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
				$scope.artistasFavoritos.push(artista);
			}
		});

	}


	$scope.desfavoritarArtista = function(id) {
		angular.forEach($scope.artistasFavoritos, function(artista, i){
			if(artista.id == id){
				$scope.artistasFavoritos.splice(i, 1);
			}
		});
	}

});