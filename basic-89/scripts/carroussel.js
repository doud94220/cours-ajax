$(function() //déclenchée lors de chargement total du DOM
{
	// MON CODE
	// let tabUrlImage = ['images/sport_1.jpg', 'images/sport_2.jpg', 'images/sport_3.jpg'];
	// console.log(tabUrlImage);

	// let carroussel = $("#slider");

	// for(i=0;i<3;i++)
	// {
	// 	$(carroussel).animate(
	// 	{
	// 		carroussel.child().child().attr('src','images/sport_1.jpg');
	// 	},1000);

	// 	if(i==2)
	// 	{
	// 		i=0;
	// 	}
	// }


	// CORRECTION PROF
	let images = 
		[
			"images/sport_1.jpg",
			"http://www.be.fa.com/content/dam/fa/nl/nl/Q12016Innovaties/17_fa_master_stages_960x360_Douche-ActiveSport-NL.jpg",
			"http://www.leporge-ecoledesurf.com/wp-content/uploads/2016/04/DSC02760.jpg"
		]
	let index = 0;

	// On definit une fonction qui s'executera toutes les 3 secondes (3000 ms)
	setInterval(function()
	{
		if(index == images.length)
		{
			index = 0;
		}

		$("#sliderImage").attr("src", images[index]);

		index++;

	},3000);
});
