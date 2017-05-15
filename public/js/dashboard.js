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
  console.log(itinerary);

  var locations = [];

  for (var i=0; i < itinerary.length; i++) {
    locations.push([itinerary[i].address, itinerary[i].latitude, itinerary[i].longitude, 0]);
  }

  // var broadway = {
  //   info: '<strong>Chipotle on Broadway</strong><br>\
  //         5224 N Broadway St<br> Chicago, IL 60640<br>\
  //         <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
  //   lat: 41.976816,
  //   long: -87.659916
  // };

  // var belmont = {
  //   info: '<strong>Chipotle on Belmont</strong><br>\
  //         1025 W Belmont Ave<br> Chicago, IL 60657<br>\
  //         <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
  //   lat: 41.939670,
  //   long: -87.655167
  // };

  // var sheridan = {
  //   info: '<strong>Chipotle on Sheridan</strong><br>\r\
  //         6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
  //         <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
  //   lat: 42.002707,
  //   long: -87.661236
  // };

  // var locations = [
  //     [broadway.info, broadway.lat, broadway.long, 0],
  //     [belmont.info, belmont.lat, belmont.long, 1],
  //     [sheridan.info, sheridan.lat, sheridan.long, 2],
  //   ];

 var map = new google.maps.Map(document.getElementById('ho-map'), {
    center: {lat: 40.440624, lng: -79.995888},
    zoom: 13
  });

  var marker = new google.maps.Marker({
    map: map,
    position: {lat: 40.440624, lng: -79.995888}
  });

  for (var i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
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