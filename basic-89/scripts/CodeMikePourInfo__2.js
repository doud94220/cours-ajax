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
		  url: "http://localhost/cours-ajax/api.php",
		  method: "GET",
		  dataType: "json" // optionel
		});
		 
		request.done(function( data ) {
			var content = "";
			data.forEach(function(element){
				content += '<li id="User-'+element.id+'"><a href="#">'+element.fistname+' '+element.lastname+'</a></li>';
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
					url: "http://localhost/cours-ajax/api.php",
					method: "GET",
					data: { id: idUser[1] },
					dataType: "json" // optionel
				});
				ficheUser.done(function( dataUser ) {
					console.info(dataUser[0].fistname+" "+dataUser[0].lastname);
					$("#firstname").val(dataUser[0].fistname);
					$("#lastname").val(dataUser[0].lastname);
					$("#datenaiss").val(dataUser[0].date_naiss);
					$("#id").val(dataUser[0].id);
					console.log($("#office").val());
					$("#office option[value="+dataUser[0].poste+"]").prop("selected",true);
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
		let increment = 0;
		let pictures;
		
		$.get( "https://jsonplaceholder.typicode.com/photos")
		.done(function( data ) {
			for(let a = 0; a < 3; a++)
				$(".one_third").eq(a).children().attr('src',data[a].url);
			pictures = data;
		});
		
		$("figcaption > a").click(function(e){
			e.preventDefault();
			var content = "";
			var indexLi = $(".one_third").length;
			
			for(let i = increment; i < increment+10; i++){
				var classHtml = "";
				if((indexLi+1)%3 == 0)
					classHtml = "lastbox";
				content += ' <li class="one_third '+classHtml+'"><img src="'+pictures[i].url+'" width="290" height="180" alt=""></li>';
				indexLi++;
			}
			$(".clear").append(content);
			increment += 10;
		});
		
		
		
	/***************** Mardi *****************/
		
		$("form").submit(function(e) {
			e.preventDefault();
			$.ajax({
				url: "http://localhost/cours-ajax/api.php",
				method: "POST",
				data: $("form").serialize()
			})
			.done(function(dataPosts){
				$("#message_ajax").html("<div class='alert alert-success'><strong>Success! </strong>User register</div>");
				console.log("User register");
			})
			.fail(function(jqXHR, textStatus) {
				$("#message_ajax").html("<div class='alert alert-danger'><strong>Error! </strong>User not register</div>");
				console.log("User not register");
			});
		});
		
		
		
		$("#deleteUser").click(function(e){
			e.preventDefault();
			$.ajax({
				url: "http://localhost/cours-ajax/api.php",
				method: "POST",
				data: {id : $("#id").val()}
			})
			.done(function(dataPosts){
				$("#message_ajax").html("<div class='alert alert-success'><strong>Success! </strong>User register</div>");
				console.log("User register");
			})
			.fail(function(jqXHR, textStatus) {
				$("#message_ajax").html("<div class='alert alert-danger'><strong>Error! </strong>User not register</div>");
				console.log("User not register");
			});
		})
		
})