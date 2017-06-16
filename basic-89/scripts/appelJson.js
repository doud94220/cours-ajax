////////////////////////////////////////////// EXO 2, 3, 4 //////////////////////////////////////////////


$(function() //déclenchée lors de chargement total du DOM
{
	////////// EXO 2 : Appel AJAX //////////

	var appelJsonElmt = $("#appelJson");

	var request = $.ajax(
	{
	  url: "https://jsonplaceholder.typicode.com/users",
	  method: "GET",
	  dataype : "json" //Optionnel
	});
	 
	request.done(function(jsonData)
	{
	 	///// AFFICHAGE des 'name' du json AVEC UN FOR
	 	// for (i=0;i<jsonData.length;i++)
		// {
		// 	var nameAjaxElmt = jsonData[i].name;
		// 	$('<p>').html(nameAjaxElmt).css('color', 'blue').appendTo(appelJsonElmt);
		// }

		///// AFFICHAGE des 'name' du json AVEC UN FOREACH
		var content = ""; //Va stocker les infos json clickables

		jsonData.forEach(function(unElmtDeJsonData)
		{
 	 		var nameAjaxElmt = unElmtDeJsonData.name;
			content += '<li id="User-' + unElmtDeJsonData.id + '"><a href="#">' + unElmtDeJsonData.name + '</a></li>';
		});

		$("#appelJson ul").html(content); //Creation des li dans le ul de l'id appelJson


		////////// EXO 3 : Clic sur les liens json //////////

		$("#appelJson ul > li").click(function(e)
		{
			e.preventDefault();

			/** Recuperation de l'id **/
			var idUser = $(this).attr("id"); //on recupere l'attribut id creer tout à l'heure dans le foreach
			console.log(idUser.split("-")); // User-3 = array("User",3); // Couper par rapport au caratere '-'
			idUser = idUser.split("-");

			/** Requet Ajax ciblé sur un seul element **/
			var ficheUserCible = $.ajax(
			{
				url: "https://jsonplaceholder.typicode.com/users",
				method: "GET",
				data: { id: idUser[1] },
				dataType: "json" // optionel
			});

			ficheUserCible.done(function(dataUserCible)
			{
				console.info(dataUserCible[0].username+" "+dataUserCible[0].email);
			});
		});
	});
	 
	request.fail(function(jqXHR, textStatus)
	{
	  alert( "Request failed: " + textStatus );
	});



	////////// EXO 4 : Les 4 parties 'Lorem ipsum....' a remplacer par le body d'un new json //////////

	var request2 = $.ajax(
	{
	  url: "https://jsonplaceholder.typicode.com/posts",
	  method: "GET",
	  dataype : "json" //Optionnel
	});

	request2.done(function(jsonData2)
	{
		// Remplacer les chaines 'Lorem ipsum...'
		for(i=0;i<4;i++) //On boucle sur les 4 premiers elements du json retourné par request
		{
			var bodyAjaxElmt = jsonData2[i].body; //Recup du body
			if(bodyAjaxElmt.length > 100) //Si y'a plus de 100 caractères dans le body
			{
				// bodyAjaxElmtTronque = bodyAjaxElmt.substring(0,100); // Je prends que les 100 premiers caractères ///Note : Attention substring() est une fonction javascript
				bodyAjaxElmtTronque = bodyAjaxElmt.slice(0,100); //Je remplace le substring par slice
				$('#services > article').eq(i).children('p').eq(0).text(bodyAjaxElmtTronque); //j'affiche que les 100 premiers caractères du "body json" dans le <p>
				$('#services > article').eq(i).children('p').eq(0).data('bodyAjaxElmt', bodyAjaxElmt); //je stocke la chaine complete du "body json" dans le même <p> avec data()
				$('#services > article').eq(i).children('p').eq(0).data('bodyAjaxElmtTronque', bodyAjaxElmtTronque); //je stocke la chaine tronquée du "body json" dans le même <p> avec data()
			}
			else
			{
				$('#services > article').eq(i).children('p').eq(0).text(bodyAjaxElmt); //j'affiche le "body json" pas tronqué
				// Note : pas val() mais text()......je perds 15 min là-dessus
			}

			// Remplacer ReadMore par  ... dans les 4 zones
			$('#services > article').eq(i).children('p').eq(1).children('a').text("...");
		}

		
		// Gérer le CLICK sur les liens ... u ReadLess
		$("#services > article > p > a").click(function(e)
		{
			e.preventDefault(); //Comme la cible du lien  = #, ca va juste empêcher de remonter en haut de page après le click

			if ($(this).text() == "...")
			{
				//Afficher le "body json" pas tronqué dans le <p>
				$(this).parent().prev().text($(this).parent().prev().data('bodyAjaxElmt')); //je recup le "body json" pas tronqué grâce à data()

				//Remplacer le ... par un readLess
				$(this).text("ReadLess");
			}
			else
			{
				//Afficher le text tronqué
				$(this).parent().prev().text($(this).parent().prev().data('bodyAjaxElmtTronque')); //je recup le "body json" tronqué grâce à data()

				//Remplacer le readLess par un "..."
				$(this).text("...");
			}
		});

		/// NOTE : LE PROF A GERER LE CLICK DANS LA BOUCLE FOR ///

	});
	 
	request2.fail(function(jqXHR, textStatus)
	{
	  	alert( "Request 2 has failed: " + textStatus );
	});

})
