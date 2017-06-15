$(function() //déclenchée lors de chargement total du DOM
{
	var appelJsonElmt = $("#appelJson");

	var request = $.ajax(
	{
	  url: "https://jsonplaceholder.typicode.com/users",
	  method: "GET";
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
		jsonData.forEach(function(unElmtDeJsonData)
		{
 	 		var nameAjaxElmt = unElmtDeJsonData.name;
			$('<p>').html(nameAjaxElmt).css('color', 'blue').appendTo(appelJsonElmt);
		});
	});
	 
	request.fail(function(jqXHR, textStatus)
	{
	  alert( "Request failed: " + textStatus );
	});

	console.log(request);
});
