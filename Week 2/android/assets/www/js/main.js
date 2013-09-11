/*
Kyle Kauck
AVF 1309
Week Two Demo App
Sept. 7, 2013
*/

$("#instagram").on("pageinit", function(){
	
	//URL With My ID for Instagram API
	var infoURL = "https://api.instagram.com/v1/tags/sports/media/recent?callback=?&amp;client_id=9e8dca04f0e844e9881f959144fe60e9";
	
		$.getJSON(infoURL, function(instaInfo){
		
			console.log(instaInfo);

			
			//This creates a UL for my images as well as a Reset Button
			var ulContainer = "<ul id='displayArea'></ul>";

			$("#instagramContent").append(ulContainer);
			
			//Simple Code to refresh the page
			$(".resetPage").on("click", function(){
			
				location.reload();
				
			});
			
			//"<h4 class='userName'>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4>
			//This will display all the images pulled from the API
			$.each(instaInfo.data, function(index, image){
			
				var pictures = $( 
				"<li><img src='" + image.images.standard_resolution.url + "' class='imageTags' alt='" + image.user.username + "' />" +
				"<h4 class='userName'>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4></li>"
				)
				$("#displayArea").append(pictures);
			
			});
		
		});
		
	
	$("#searchButton").on("click", function(){
		
		//Saves my Search Value and then uses it to make a dynamic URL
		var searchInput = $("#search").val();
		var dynamicURL = "https://api.instagram.com/v1/tags/" + searchInput + "/media/recent?callback=?&amp;client_id=9e8dca04f0e844e9881f959144fe60e9"
		
		$.getJSON(dynamicURL, function(dynamicInfo){
			
			//$("#instagramContent").empty();
			
			//This creates a UL for my images as well as a Reset Button
			$("#displayArea").empty();
			
			//$("#instagramContent").append(ulContainer);

			//Simple Code to refresh the page
			$(".resetPage").on("click", function(){
			
				location.reload();
				
			});
			
			//This will display all the images pulled from the API
			$.each(dynamicInfo.data, function(index, image){
			
				var pictures = $( 
				"<li><img src='" + image.images.standard_resolution.url + "' class='imageTags' alt='" + image.user.username + "' />" +
				"<h4 class='userName'>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4></li>"
				)
				
				$("#displayArea").append(pictures);
			
			});
			
		});
		
	});
	
});

$("#weather").on("pageinit", function(){

	//var weatherURL = "https://api.forecast.io/forecast/afe41a79945b7a8b5ea5629208b68e8a/50.4547,-104.6067"
	
	var weatherURL = "http://api.wunderground.com/api/5e635afafbd17b86/conditions/q/zmw:00000.3.71514.json"
	
	$("#weatherDisplay").on("click", function() {
	
		$.ajax({
			
			url: weatherURL,
			dataType: "jsonp",
			cache: false,
			success: function(info){
			
				var weatherInfo = $(
					"<li class='weatherDisplay'>Location: " + info.current_observation.display_location.full + "</li>" +
					"<li class='weatherDisplay'>Current Conditions: " + info.current_observation.weather + "</li>" +
					"<li class='weatherDisplay'>Current Temperature: " + info.current_observation.temperature_string + "</li>" +
					"<li class='weatherDisplay'>Current Wind Conditions: " + info.current_observation.wind_string + "</li>" +
					"<li class='weatherDisplay'>Relative Humidity: " + info.current_observation.relative_humidity + "</li>" +
					"<li class='weatherDisplay'>Last Updated: " + info.current_observation.observation_time + "</li>"
				)
				
				$("#weatherInfo").append(weatherInfo);
				$("#weatherInfo").css("display", "inline-table");
			}
			
		})
			
	});
	
});