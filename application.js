$(document).ready(function() {
	// Initialize the datepicker
	$('.datepicker').pickadate({
		selectMonths: true, 
		selectYears: 5
	});

	// Initialize dropdowns
	$('select').material_select();

	// Submit form button
	$('#submit-button').click(function(event) {
		event.preventDefault();
		window.location = "confirmation.html";
	});

	// Initialize learn more text variable with the arrow character
	var learnMoreText = $("#learn-more-shelter").html();

	// Learn more buttons for types of incidents
	$("#learn-more-shelter").click(function() {
		if ($(this).text() == "Close") {
			$("#shelter-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#shelter-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-conditions").click(function() {
		if ($(this).text() == "Close") {
			$("#conditions-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#conditions-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-outside").click(function() {
		if ($(this).text() == "Close") {
			$("#outside-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#outside-more-info").show("slow");
			$(this).text("Close");
		}
	});

	
});

// Google Maps
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.440624, lng: -79.995888},
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infowindow.setPosition(pos);
        infowindow.setContent('Location found.');
        infowindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infowindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infowindow, map.getCenter());
    }

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
          console.log('Checkbox clicked! New state=' + this.checked);
          autocomplete.setOptions({strictBounds: this.checked});
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infowindow.setPosition(pos);
        infowindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infowindow.open(map);
    }
}