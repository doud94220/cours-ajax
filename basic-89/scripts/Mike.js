$(function(){

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
			console.log(idUser.split("-")); // User-3 = array("User",3); // Couper par rapport au caratere '-'
			idUser = idUser.split("-");
			
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
	
	

	
	
	
})