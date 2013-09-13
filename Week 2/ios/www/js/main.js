/*
Kyle Kauck
AVF 1309
Week Two Demo App
Sept. 7, 2013
*/

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$("#weatherDisplay").on("click", weatherLoad); //Calls for my Weather API Function
	$("#instagram").on("pageinit", instagramLoadDefault); //Calls for my Instagram Default Load Function
	$("#searchButton").on("click", instagramSearch); //Calls for my Instagram Search Function
}


//Runs my Weather API and Displays
var weatherLoad = function() {

	var weatherURL = "http://api.wunderground.com/api/5e635afafbd17b86/conditions/q/zmw:00000.3.71514.json"
	
	$.ajax({
			
		url: weatherURL,
		dataType: "jsonp",
		success: function(info){
		
			$("#weatherInfo").empty();
		
			var weatherInfo = $(
				"<li class='weatherDisplay'>Location: " + info.current_observation.display_location.full + "</li>" +
				"<li class='weatherDisplay'>Current Conditions: " + info.current_observation.weather + "</li>" +
				"<li class='weatherDisplay'>Current Temperature: " + info.current_observation.temperature_string + "</li>" +
				"<li class='weatherDisplay'>Wind: " + info.current_observation.wind_string + "</li>" +
				"<li class='weatherDisplay'>Relative Humidity: " + info.current_observation.relative_humidity + "</li>" +
				"<li class='weatherDisplay'>" + info.current_observation.observation_time + "</li>"
			)
			
			$("#weatherInfo").append(weatherInfo);
			$("#weatherInfo").css("display", "inline-table");
		}
			
	});
}

//Loads in my default Instagram API Data
var instagramLoadDefault = function(){
	
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
		
		//This will display all the images pulled from the API
		$.each(instaInfo.data, function(index, image){
		
			var pictures = $( 
			"<li class='imageContain'><img src='" + image.images.standard_resolution.url + "' class='imageTags' alt='" + image.user.username + "' />" +
			"<br /><h4 class='userName'>Posters Username: " + image.user.username + " ---- Likes: " + image.likes.count + "</h4></li>"
			)
			$("#displayArea").append(pictures);
		
		});
	
	});

}

//Uses the search to find images based on entered search information
var instagramSearch = function (){
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
			"<li class='imageContain'><img src='" + image.images.standard_resolution.url + "' class='imageTags' alt='" + image.user.username + "' />" +
			"<br /><h4 class='userName'>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4></li>"
			)
			
			$("#displayArea").append(pictures);
		
		});
		
	});

}