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


	////////// EXO 5 : Afficher pleins de photos par clic successif //////////

	//////// Mon Code :

	var request3 = $.ajax(
	{
	  url: "https://jsonplaceholder.typicode.com/photos",
	  method: "GET",
	  dataype : "json" //Optionnel
	});

	request3.done(function(jsonData3)
	{
		let cpt = 0; //Compteur du nombre d'images affichées

		//On boucle sur les 3 premiers elements du json retournés par request 3
		for(i=1;i<4;i++) //j'ajuste les indices pour un depart à 0 pour me caller sur les indices de json
		{
			//On remplace les 3 images qui sont visibles au chargment de la page
			$('#latest').find('img').eq(i).attr('src',jsonData3[i].url);
		}
		cpt = i; //Maj du compteur d'images affichées

		//Gestion click sur 'View All Our Recent Work Her' => J'en affiche 10 de plus
		$("#latest figcaption a").click(function(e)
		{
			e.preventDefault();

			//On boucle sur les 10 elements suivants ceux deja chargés du json retournés par request 3
			for (j=cpt;j<cpt+10;j++)
			{
				let resteDivisionPar3 = j%3;
				if (resteDivisionPar3 == 0)
				{
					//J'ajoute un <li><img></li avec la classe 'one_third lastbox' dans <img>
					$('#latest ul').append("<li class='one_third lastbox'><img src=" + jsonData3[j].url + " width='290' height='180' alt=''></li>");
					// Note : append() pour ajouter à la fin
				}
				else 
				{
					//J'ajoute un <li><img></li avec la classe 'one_third' dans <img>
					$('#latest ul').append("<li class='one_third'><img src=" + jsonData3[j].url + " width='290' height='180' alt=''></li>");
				}
			}
			cpt = j; //Maj du compteur d'images affichées
		}); //Fin gestion click
	});

	request3.fail(function(jqXHR, textStatus)
	{
	  	alert( "Request 3 has failed: " + textStatus );
	});





	////////// Code de Mike pour exo 5 :

	let increment = 0;//init d'une variable qui compte le nombre de photos du json affichés sur 'View All Our Recent Work Her'
	let picture; //servira a récupérer data en dehors du done
	$.get('https://jsonplaceholder.typicode.com/photos')
	.done(function(data)
	{
		for (let a=0; a<3 ; a++)
		{
			$(".one_third").eq(a).children().attr('src',data[a].url); //changement de scr sur l'image
		}
		picture=data; //on remonter data dans le done grace à variable picture
	});

	$("figcaption > a").click(function(e)
	{
		e.preventDefault();

		var content = "";
		var indexLi = $(".one_third").length;

		for (let i=increment; i<increment+10;i++)
		{
			var classHtml = ";"
			if ((indexLi+1)%3 == 0)
			{
				classHtml = "Lastbox";
			}
			content += .....;
		}
		increment += 10;
		}
	});



});
