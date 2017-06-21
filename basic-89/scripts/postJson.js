$(function() //Déclenchée lors de chargement total du DOM
{
	/////////////// Je recopie code Mike, et je modifie qques détails, et je mets qques comments ///////////////
		
	// Gestion du click sur bouton valider
	$("form").submit(function(e) {
		e.preventDefault();
		$.ajax(
		{
			url: "http://localhost/J47-49-AjaxDev/cours-ajax/basic-89/users.php",
			method: "POST",
			data: $("form").serialize() //Mettre sur une ligne les dat du form comme dans le get d'une url
		})
		.done(function(dataPosts)
		{
			$("#msgForm").html("<div class='alert alert-success'><strong>Success! </strong>User registered</div>");
			//Faut boostrap pour faire marcher les classes alert and co
			console.log("User registered");
		})
		.fail(function(jqXHR, textStatus) {
			$("#msgForm").html("<div class='alert alert-danger'><strong>Error! </strong>User not registered</div>");
			console.log("User not registered");
		});
	});
	
	// Gestion du click sur bouton reset
	$("#deleteUser").click(function(e)
	{
		e.preventDefault();
		$.ajax(
		{
			url: "http://localhost/J47-49-AjaxDev/cours-ajax/basic-89/users.php",
			method: "POST",
			data: {id : $("#id").val()}
		})
		.done(function(dataPosts)
		{
			$("#msgForm").html("<div class='alert alert-success'><strong>Success! </strong>User unregistered</div>");
			console.log("User unregistered");
		})
		.fail(function(jqXHR, textStatus)
		{
			$("#msgForm").html("<div class='alert alert-danger'><strong>Error! </strong>User not unregistered</div>");
			console.log("User not unregistered");
		});
	}) //Fin code Mike
	
}); //Fin fonction globale
