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
	$("#geolocation").on("pageinit", geoLoad); //Calls for my Geolocation Funciton
	$("#notiButton").on("click", notiLoad); // Calls for Notification Function
	$("#accelerometer").on("pageinit", acceLoad); // Calls for Accelerometer Function
	$("#conButton").on("click", conLoad); //Calls for the Notifcation Function
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

//Function that fires for my Geolocation
var geoLoad = function(){
	
	alert("I started!");
	navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg);

};

//Success Function Will display my geolocation Data
var geoSuccess = function(position) {

	alert("I'm still firing");
	
	var geoInfomation = $(
		"<li>Latitude: " + position.coords.latitude + "</li> " +
		"<li>Longitude: " + position.coords.longitude + "</li> " +
		"<li>Altitude: " + position.coords.altitude + "</li> " +
		"<li>Accuracy: " + position.coords.accuracy + "</li> " +
		"<li>Altitude Accuracy: " + position.coords.altitudeAccuracy + "</li> "
	)
	
	$("#geoInfo").append(geoInfomation);

};

//Error Function Will display an error if something went wrong with Geolocation
var errorMsg = function(error){

	alert(error.code + error.message);

};

//Load the Notification Function
var notiLoad = function(){
	
	navigator.notification.alert(
		"Did you just see that play?!",
		gameOver,
		"Kyle Kauck",
		"Dismiss"
	);
	
}

//Call once initial notification is closed.
var gameOver = function(){
	
	alert("They lost bro!")
	
}

//Call for initial Accelerometer Call
var  acceLoad = function(){
	
	navigator.accelerometer.watchAcceleration(acceSuccess, acceError, {frequency: 500});
	
};

//Call for Accelerometer Success
var acceSuccess = function(acceleration){
	
	var accInformation = $(
		"<li>Acceleration X: " + acceleration.x + "</li>" +
		"<li>Acceleration Y: " + acceleration.y + "</li>" +
		"<li>Acceleration Z: " + acceleration.z + "</li>"
	)
	
	$("#accInfo").append(accInformation);
	
};

//Accelerometer error function
var accError = function() {
	
	alert("There was an error!");
	
}

//Function to display the Connection Information
var conLoad = function(){
	
	var connectionStatus = navigator.connection.type;
	
	var activeStatus = {
		
		"Connection.UNKNOWN" : "No Network Detected!",
		"Connection.WIFI"    : "You Are Currently Connected To Wifi Network",
		"Connection.CELL_2G" : "You Are Currently Connected To A 2G Network",
		"Connection.CELL_3G" : "You Are Currently Connected To A 3G Network",
		"Connection.CELL_4G" : "You Are Currently Connected To A 4G Network",
		"Connection.CELL"    : "We Cannot Detect Your Current Cell Network",
		"Connection.NONE"    : "You Are Currently Not Connected To A Network"
		
	};
	
	alert(activeStatus[connectionStatus]);
	
}