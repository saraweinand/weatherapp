
		var icons = { "clear-day" : "B", 
					"clear-night" : "C",
					"rain" : "R",
					"snow" : "G",
					"sleet" : "X",
					"wind" : "S",
					"fog" : "N", 
					"cloudy" : "Y",
					"partly-cloudy-day" : "H",
					"partly-cloudy-night" : "I"
				};
 

		var cities = {


				"spokane" : {coords: {latitude: 47.678491, longitude: -117.432448}},
				"current location" : ""
		};

					   
		function loadWeather(cityCoords){
			var latlng  = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
			var forecastURL = "https://api.forecast.io/forecast/d75ca564b392bdabad2742a280fb9fa8/"+latlng;

			$.ajax({
					url: forecastURL,
					jsonCallback: 'jsonCallback',
					contentType: "application/json",
					dataType: 'jsonp',
					success: function(json) {
						console.log(json);
						$("#current_temp").html(Math.round(json.currently.temperature)+"&#176;");
						$("#current_summary").html(json.currently.summary);
						$("#current_temp").attr("data-icon",icons[json.currently.icon]);

					},
				
					error: function(e) {
						console.log(e.message);
					}
			});

		}

		function loadCity(city) {
			$("#location").html(city);

				if (city.toLowerCase() == "current location") {
					if ( navigator.geolocation )
						navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity);
					else {
						loadDefaultCity();
					}
				} else {

			loadWeather(cities[city.toLowerCase()]);
		}


	}

	function loadDefaultCity () {
		loadCity("Spokane");
	}
		
		$(document).ready(function(){
			loadCity("Spokane");

			$("a.city").bind("click", function(){
				loadCity($(this).html());
			});
		});
