/*
Kyle Kauck
AVF 1309
Week Two Demo App
Sept. 7, 2013
*/

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$("#weatherDisplay").on("click", weatherLoad); //Calls for my Weather API Function
	$("#instagram").on("pageinit", instagramLoadDefault); //Calls for my default Instagram Function
	$("#searchButton").on("click", instagramSearch); //Calls for my search Instagram Function
	$("#geolocation").on("pageinit", geoLoad); //Calls for my Geolocation Funciton
	$("#connection").on("pageinit", conLoad); //Calls for my Connection Function
	//$("#camera").on("pageinit", cameraLoad); //Calls for my Camera  Function
	$("#contacts").on("pageinit", contactLoad); //Calls for my Contact Function
	$("#notifications").on("pageinit", notiLoad); //Calls for my Notification Function
}

//Function to load and display Weather API
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

//Function that loads and displays default Instagram Data
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

//Function that takes a entered search and displays Instagram Images based on input
var instagramSearch = function (){
	var searchInput = $("#search").val();
	var dynamicURL = "https://api.instagram.com/v1/tags/" + searchInput + "/media/recent?callback=?&amp;client_id=9e8dca04f0e844e9881f959144fe60e9"
	
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
			"<li class='imageContain'><img src='" + image.images.standard_resolution.url + "' class='imageTags' alt='" + image.user.username + "' />" +
			"<br /><h4 class='userName'>Posters Username: " + image.user.username + " Likes: " + image.likes.count + "</h4></li>"
			)
			
			$("#displayArea").append(pictures);
		
		});
		
	});

}

//Function that fires for my Geolocation
var geoLoad = function(){
	
	navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg);
	
}

//Success Function Will display my geolocation Data
var geoSuccess = function(position) {
		
	console.log("I'm still firing");
		
	var geoInfomation = $(
		"<li>Latitude: " + position.coords.latitude  + "</li> " +
		"<li>Longitude: " + position.coords.longitude  + "</li> " +
		"<li>Altitude: " + position.coords.altitude  + "</li> " +
		"<li>Accuracy: " + position.coords.accuracy  + "</li> " +
		"<li>Altitude Accuracy: " + position.coords.altitudeAccuracy  + "</li> " 
	)
		
	$("#geoInfo").append(geoInfomation);
		
};

//Error Function Will display an error if something went wrong with Geolocation	
var errorMsg = function(error){
		
	alert(error.code + error.message);
	
}

var conLoad = function(){
	
	var netCheck = navigator.networkinformation.type;
	
	var network = {}
			network[Connection.UNKNOWN]  = 'Unknown connection';
            network[Connection.ETHERNET] = 'Ethernet connection';
            network[Connection.WIFI]     = 'WiFi connection';
            network[Connection.CELL_2G]  = 'Cell 2G connection';
            network[Connection.CELL_3G]  = 'Cell 3G connection';
            network[Connection.CELL_4G]  = 'Cell 4G connection';
            network[Connection.CELL]     = 'Cell generic connection';
            network[Connection.NONE]     = 'No network connection';
	
			alert("You are connected to: " + network[netCheck]);
}

var contactLoad = function(){
		
		var myContact = navigator.contacts.create({"displayName": "Test User"});
        myContact.note = "This contact has a note.";
        console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);
        
}

var notiLoad = function() {

        navigator.dialogs.alert(
            'You are the winner!',
            changePage,
            'You won yo!',
            'Collect Monies!'
        );
}
var changePage = function(){

	alert("I lied stay here!");
	
}