$(document).ready(function() {
  // Refreshing page twice each load 
  // Hack for itinerary not updating right after database change
  window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        location.reload();
    }
  }

	// Initialize the datepicker
	$('.datepicker').pickadate({
		selectMonths: true, 
		selectYears: 5
	});

	// Initialize dropdowns
	$('select').material_select();

	// Initialize collapse button
  $(".button-collapse").sideNav();

  // Initialize jQuery Sortable
  $(".sortable").sortable();
  $(".sortable").disableSelection();
});

function addToItinerary(id) {
  $.post("/addToItinerary", { data: id })
      .done(function( data ) {
        window.location = "/dashboard";
    });
}

function removeFromItinerary(id) {
  $.post("/removeFromItinerary", { data: id })
      .done(function( data ) {
        window.location = "/dashboard";
    });
}

// Google Maps
function initMap() {
  var map = new google.maps.Map(document.getElementById('ho-map'), {
    center: {lat: 40.440624, lng: -79.995888},
    zoom: 13
  });

  var marker = new google.maps.Marker({
    map: map,
    position: {lat: 40.440624, lng: -79.995888}
  });
  
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

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

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infowindow.open(map);
  }
}