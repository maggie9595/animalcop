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
  var learnMoreText = $("#learn-more-running").html();
  // In case people want to change the badge wording later
  // var what = Report + &#9654;
  var what = "Report"

  // Learn more buttons for types of incidents

  $("#learn-more-running").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#running-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#running-more-info").hide("slow");
      $(this).text(learnMoreText);
    }
  });

  $("#running").click(function() {
    if($(this).prop('checked') == true) {
      $("#running-more-info").show("slow");
      $("#learn-more-running").text("Close");
    } else if ($("#learn-more-running").text() == "Close"){
        $("#running-more-info").hide("slow");
        $("#learn-more-running").text(learnMoreText);
    }
  });



  $("#nuisance").click(function() {
    if($(this).prop('checked') == true) {
      $("#nuisance-more-info").show("slow");
      $("#learn-more-nuisance").text("Close");
    } else if ($("#learn-more-nuisance").text() == "Close"){
        $("#nuisance-more-info").hide("slow");
        $("#learn-more-nuisance").text(learnMoreText);
    }
  });

  $("#learn-more-nuisance").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#nuisance-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#nuisance-more-info").hide("slow");
      $(this).text(learnMoreText);
    }
  });


  $("#bites").click(function() {
    if($(this).prop('checked') == true) {
      $("#bites-more-info").show("slow");
      $("#learn-more-bites").text("Close");
    } else if ($("#learn-more-bites").text() == "Close"){
        $("#bites-more-info").hide("slow");
        $("#learn-more-bites").text(learnMoreText);
    }
  });

  $("#learn-more-bites").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#bites-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#bites-more-info").hide("slow");
      $(this).text(learnMoreText);
    }
  });

   $("#license").click(function() {
    if($(this).prop('checked') == true) {
      $("#license-more-info").show("slow");
      $("#learn-more-license").text("Close");
    } else if ($("#learn-more-license").text() == "Close"){
        $("#license-more-info").hide("slow");
        $("#learn-more-license").text(learnMoreText);
    }
  });


  $("#learn-more-license").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#license-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#license-more-info").hide("slow");
      $(this).text(learnMoreText);
    }
  });

   $("#theft").click(function() {
    if($(this).prop('checked') == true) {
      $("#theft-more-info").show("slow");
      $("#learn-more-theft").text("Close");
    } else if ($("#learn-more-theft").text() == "Close"){
        $("#theft-more-info").hide("slow");
        $("#learn-more-theft").text(learnMoreText);
    }
  });

  $("#learn-more-theft").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#theft-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#theft-more-info").hide("slow");
      $(this).text(learnMoreText);
    }
  });

  $("#limit").click(function() {
    if($(this).prop('checked') == true) {
      $("#limit-more-info").show("slow");
      $("#learn-more-limit").text("Close");
    } else if ($("#learn-more-limit").text() == "Close"){
        $("#limit-more-info").hide("slow");
        $("#learn-more-limit").text(learnMoreText);
    }
  });

  $("#learn-more-limit").click(function() {
    if ($(this).text() == learnMoreText) {
      $("#limit-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#limit-more-info").hide("slow");
      $(this).text(learnMoreText);
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
