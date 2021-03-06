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
    map: map
  });

  // Itinerary on map
  var itineraryLocations = [];

  for (var i=0; i < itinerary.length; i++) {
    itineraryLocations.push(["In your itinerary:<br><br>" + itinerary[i].address + "<br><br> Received on " + itinerary[i].received, itinerary[i].latitude, itinerary[i].longitude, 0]);
  }

  for (var i = 0; i < itineraryLocations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(itineraryLocations[i][1], itineraryLocations[i][2]),
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(itineraryLocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  // New reports on map
  var newReportLocations = [];

  for (var i=0; i < newReports.length; i++) {
    newReportLocations.push(["New report:<br><br>" + newReports[i].address + "<br><br> Received on " + newReports[i].received, newReports[i].latitude, newReports[i].longitude, 0]);
  }

  for (var i = 0; i < newReportLocations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(newReportLocations[i][1], newReportLocations[i][2]),
      map: map, 
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(newReportLocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  // In progress reports on map
  var inProgressReportLocations = [];

  for (var i=0; i < inProgressReports.length; i++) {
    inProgressReportLocations.push(["Case in progress:<br><br>" + inProgressReports[i].address + "<br><br> Received on " + inProgressReports[i].received + "<br><br> Last visited on " + inProgressReports[i].dateUpdated, inProgressReports[i].latitude, inProgressReports[i].longitude, 0]);
  }

  for (var i = 0; i < inProgressReportLocations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(inProgressReportLocations[i][1], inProgressReportLocations[i][2]),
      map: map, 
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(inProgressReportLocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
  
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