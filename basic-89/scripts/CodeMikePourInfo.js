$(function(){

	/***************** Jeudi *****************/
		let images = [
		"http://wowslider.com/sliders/demo-69/data1/images/bubbles.jpg",
		"http://wowslider.com/sliders/demo-76/data1/images/purse407176_1280.jpg",
		"http://cruzjon.com/projects/image-slider/build/img/sur.jpg"];
		let index = 0;

		setInterval(function(){

			if(index == images.length) // Verification dernier image
				index = 0;

			$("#sliderImage").attr("src",images[index]); // Modification source image via array

			index++; // increment index


		},3000);

		
		var request = $.ajax({
		  url: "https://jsonplaceholder.typicode.com/users",
		  method: "GET",
		  dataType: "json" // optionel
		});
		 
		request.done(function( data ) {
			var content = "";
			data.forEach(function(element){
				content += '<li id="User-'+element.id+'"><a href="#">'+element.name+'</a></li>';
			});
			$("#right_column ul").html(content);
			/************ START NEW **************/
			$("#right_column ul > li").click(function(e) {
				e.preventDefault();
				
				/** Recuperation de l'id **/
				var idUser = $(this).attr("id");
				idUser = idUser.split("-");// User-3 = array("User",3); // Couper par rapport au caratere '-'
				
				/** Requet Ajax **/
				var ficheUser = $.ajax({
					url: "https://jsonplaceholder.typicode.com/users",
					method: "GET",
					data: { id: idUser[1] },
					dataType: "json" // optionel
				});
				ficheUser.done(function( dataUser ) {
					console.info(dataUser[0].username+" "+dataUser[0].email);
				});
			});
			/************ END NEW **************/
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	
	/***************** Vendredi *****************/
		$.ajax({
			url: "https://jsonplaceholder.typicode.com/posts",
			method: "GET",
			dataType: "json" // optionel
		})
		.done(function(dataPosts){
			for(let i = 0; i < 4; i++){
				$(".one_quarter > strong").eq(i).text(dataPosts[i].title);
				// dataPosts[i].body.slice(0, 97)+"...";
				$(".jsDescription").eq(i).text(dataPosts[i].body.slice(0, 97)+"...");
				$(".one_quarter a").eq(i).click(function(e){
					e.preventDefault();
					if($(this).text() != "Read less »"){
						$(".jsDescription").eq(i).text(dataPosts[i].body);
						$(this).text("Read less »");
					}else{
						$(".jsDescription").eq(i).text(dataPosts[i].body.slice(0, 97)+"...");
						$(this).text("Read more »");
					}
				})
			}
		})
		.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		
		
		
		
		
		/************ START NEW **************/
		///// A PARTIR DE LA C'EST MOI QUI METS LES COMMENTAIRES SUR LE CODE DE MIKE POUR L'EXO 5 DE VENDREDI
		let increment = 0; //Init compteur d'images affichées, cette variable est globale
		let pictures; //Servira à stocker en global la variable data du done
		
		$.get( "https://jsonplaceholder.typicode.com/photos") //Sympa cette forme contractée du GET
		.done(function( data )
		{
			for(let a=0; a<3; a++)
				$(".one_third").eq(a).children().attr('src',data[a].url); //il change les url des 3 premières images
				//Mike met pas d'accolades pour le for pake une seuke ligne dedans
			pictures = data; //je stocke data dans une variable globale
		});
		
		//Gestion du click
		$("figcaption > a").click(function(e)
		{
			e.preventDefault();

			var content = ""; //Servira à stocker les 10 images à rajouter
			var indexLi = $(".one_third").length;
			//indexLi contiendra le nbre d'images affichées cad le nombre de classes one_third
			//indexLi est une variable locale, connue que dans la gestion du click
			
			//On boucle 10 fois pour chopper les 10 elements suivants de json
			for(let i = increment; i < increment+10; i++)
			{
				var classHtml = ""; //Init variable qui contiendra la classe de l'image
				if((indexLi+1)%3 == 0) //Test si numéro image est un multiple de trois (en faisant +1 pour ajuster les indices du for et de json)
					classHtml = "lastbox"; //Si oui classe="lastbox"
				//Là on n'est plus dans le if
				//Dessous on alimente content avec <li><img></li> avec les bonnes classes
				content += ' <li class="one_third '+classHtml+'"><img src="'+pictures[i].url+'" width="290" height="180" alt=""></li>';
				indexLi++; //Incrémentation à chaque tour de boucle du nombre d'images affichées
			}

			$(".clear").append(content); //On ajoute le content à la fin de la classe 'clear'
			increment += 10; //On rajoute 10 au nombre d'images affichées
		});
})