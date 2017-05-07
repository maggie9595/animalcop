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
	var learnMoreText = $("#shelter").html();

	// Learn more buttons for types of incidents
	$("#shelter").click(function() {
		if ($(this).text() == "Close") {
			$("#shelter-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#shelter-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#conditions").click(function() {
		if ($(this).text() == "Close") {
			$("#conditions-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#conditions-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#outside").click(function() {
		if ($(this).text() == "Close") {
			$("#outside-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#outside-more-info").show("slow");
			$(this).text("Close");
		}
	});

  $("#violence").click(function() {
    if ($(this).text() == "Close") {
      $("#violence-more-info").hide("slow");
      $(this).html(learnMoreText);
    } else {
      $("#violence-more-info").show("slow");
      $(this).text("Close");
    }
  });

  $("#illness").click(function() {
    if ($(this).text() == "Close") {
      $("#illness-more-info").hide("slow");
      $(this).html(learnMoreText);
    } else {
      $("#illness-more-info").show("slow");
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
    draggable: true,
    anchorPoint: new google.maps.Point(0, -29)
  });
  // Add a listener to the draggable marker that will get the new location when the drag ends
  marker.addListener('dragend', reverseGeocode);

  // Get new location with reverse geocoding
	function reverseGeocode(event) {
		var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(17);

          // Update the address in the search box
          $('#pac-input').val(results[1].formatted_address);
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
	}

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infowindow.setPosition(pos);
      infowindow.setContent('You are here!');
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
    infowindow.setContent(infowindowContent);
    infowindow.open(map, marker);
  });

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infowindow.open(map);
  }
}