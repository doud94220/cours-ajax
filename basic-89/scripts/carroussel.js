//////////////// EXO 1 ////////////////

$(function() //déclenchée lors de chargement total du DOM
{
	// CORRECTION PROF
	let images = 
		[
			"http://www.gynecolille.fr/upl/website/gynecologie-et-sport/7_srcset-large.jpg",
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
