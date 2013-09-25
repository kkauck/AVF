/*
Kyle Kauck
AVF 1309
Week Four Demo App
Sept. 21, 2013
*/

$("#index").on("pageinit", function(){
	alert("I so totally loaded before anything else!");
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$("#weather").on("pageinit", weatherLoad); //Calls for my Weather API Function
	$("#instagram").on("pageinit", instagramLoadDefault); //Calls for my Instagram Default Load Function
	$("#searchButton").on("click", instagramSearch); //Calls for my Instagram Search Function
	$("#geolocation").on("pageinit", geoLoad); //Calls for my Geolocation Funciton
	$("#notiButton").on("click", notiLoad); // Calls for Notification Function
	$("#conButton").on("click", conLoad); //Calls for the Contacts Function
	$("#connectionButton").on("click", connectionLoad); // Calls for the Connection Function
	$("#camButton").on("click", camLoad); //Calls for Camera Function
}

//Runs my Weather API and Displays by Getting Users GeoLocation then using Ajax Calls finds local code for location and then displays information/radar
var weatherLoad = function(){
	
	navigator.geolocation.getCurrentPosition(weatherSuccess, weatherFail);
	
};

var weatherSuccess = function(position){
	
	var lat = position.coords.latitude; //Variable to save  Latitude
	var lon = position.coords.longitude; //Variable to save Longitude
	
	var getWeatherStation = "http://api.wunderground.com/api/5e635afafbd17b86/geolookup/q/" + lat + "," + lon + ".json";
	
	$.ajax({
		
		url: getWeatherStation,
		dataType: "jsonp",
		success: function(weatherStation){
			
			var localStation = weatherStation.location.l;
			
			var localWeather = "http://api.wunderground.com/api/5e635afafbd17b86/conditions" + localStation + ".json";
			var localRadar = "http://api.wunderground.com/api/5e635afafbd17b86/radar" + localStation + ".gif?radius=100&width=400&height=400&rainsnow=1&newmaps=1";
			
			$.ajax({
				
				url: localWeather,
				dataType: "jsonp",
				success: function(info){
				
					var weatherInfo = $(
						"<li>Location: " + info.current_observation.display_location.full + "</li>" +
						"<li>Current Conditions: " + info.current_observation.weather + "</li>" +
						"<li>Current Temperature: " + info.current_observation.temperature_string + "</li>" +
						"<li>Wind: " + info.current_observation.wind_string + "</li>" +
						"<li>Relative Humidity: " + info.current_observation.relative_humidity + "</li>" +
						"<li>" + info.current_observation.observation_time + "</li>" +
						"<li><img src=" + localRadar + "/></li>"
					);
					
					$("#weatherInfo").append(weatherInfo);
					$("#weatherInfo").css("display", "inline-table");
				
				
				}
			});
			
		}
	});
	
};

var weatherFail = function (){
	
	alert("Sorry we could not detect your current location.");
	
};

//Loads in my default Instagram API Data
var instagramLoadDefault = function(){
	
	var infoURL = "https://api.instagram.com/v1/tags/sports/media/recent?callback=?&amp;client_id=9e8dca04f0e844e9881f959144fe60e9";
	
	var internetConnection = navigator.connection.type;
	    
	if(internetConnection === Connection.NONE){
		
		alert ("Sorry we cannot load Instagram because you are not connected to the internet.");
		window.location.reload();
		
	} else {
	
		$.getJSON(infoURL, function(instaInfo){
			
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
					"<li><img src='" + image.images.standard_resolution.url + "' alt='" + image.user.username + "' />" +
					"<br /><h4>Posters Username: " + image.user.username + " ---- Likes: " + image.likes.count + "</h4></li>"
				);
				$("#displayArea").append(pictures);
			
			});
		
		});
		
	}

};

//Uses the search to find images based on entered search information
var instagramSearch = function (){
	
	var searchInput = $("#search").val();
	var dynamicURL = "https://api.instagram.com/v1/tags/" + searchInput + "/media/recent?callback=?&amp;client_id=9e8dca04f0e844e9881f959144fe60e9";
	
	var internetConnection = navigator.connection.type;
	
	if(internetConnection === Connection.NONE){
		
		alert ("Sorry we cannot load Instagram because you are not connected to the internet.");
		window.location.reload();
		
	} else {
	
		$.getJSON(dynamicURL, function(dynamicInfo){
			
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
					"<li><img src='" + image.images.standard_resolution.url + "' alt='" + image.user.username + "' />" +
					"<br /><h4>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4></li>"
				);
				
				$("#displayArea").append(pictures);
			
			});
			
		});
	
	};

};

//Function that fires for my Geolocation
var geoLoad = function(){
	
	navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg);

};

//Success Function Will display my geolocation Data
var geoSuccess = function(position) {
	
	var geoInfomation = $(
		"<li>Latitude: " + position.coords.latitude + "</li> " +
		"<li>Longitude: " + position.coords.longitude + "</li> " +
		"<li>Accuracy: " + position.coords.accuracy + "</li> "
	);
	
	$("#geoInfo").append(geoInfomation);

};

//Error Function Will display an error if something went wrong with Geolocation
var errorMsg = function(error){

	alert(error.code + error.message);

};

//Load the Notification Function
var notiLoad = function(){

	console.log("I get this far!");
	
	navigator.notification.alert(
		"Did you just see that play?!",
		gameOver,
		"Kyle Kauck",
		"Dismiss"
	);
	
};

//Call once initial notification is closed.
var gameOver = function(){
	
	alert("They lost bro!");
	
};

//Function to display the Connection Information
var connectionLoad = function(){

	
	var networkStatus = navigator.connection.type;
	
	var network = {};
	    network[Connection.UNKNOWN]  = "Sorry we cannot detect your connection.";
	    network[Connection.ETHERNET] = "You are currently connected to your ethernet connection.";
	    network[Connection.WIFI]     = "You are currently connected to Wifi.";
	    network[Connection.CELL_2G]  = "You are currently connected to a 2G Network.";
	    network[Connection.CELL_3G]  = "You are currently connected to a 3G Network.";
	    network[Connection.CELL_4G]  = "You are currently connected to a 4G Network.";
	    network[Connection.CELL]     = "We cannot tell what kind of cell connection you are on.";
	    network[Connection.NONE]     = "You currently are not connected to any type of internet.";
    
	
	alert(network[networkStatus]);
	
};

//Function to Create/Display Created Contact
var conLoad = function(){
	
	var newContact = navigator.contacts.create({
		"displayName" : $("#contactName").val()});
		newContact.note = $("#contactNote").val();
		newContact.phoneNumber = $("#contactPhone").val();
		
		var contactInfo = $(
			"<li><strong>Contact Name:</strong> " + newContact.displayName + "</li>" +
			"<li><strong>Phone Number:</strong> " + newContact.phoneNumber + "</li>" +
			"<li><strong>Notes:</strong> " + newContact.note + "</li>" 
		);
		
		$("#conDisplay").append(contactInfo);
	
};

//Function to bring up Camera
var camLoad = function(){

	navigator.camera.getPicture(picSuccess, picFail, { quality: 100,
        saveToPhotoAlbum: true });
        
};

//Success function if user saves their photo
var picSuccess = function() {
	alert("Your Image Has Been Saved to Photo Album!");
};

//Fail function letting user know the picture was not saved
var picFail = function() {
    alert("No Picture Was Taken");
};