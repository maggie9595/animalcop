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
    window.location = "/confirmation";
  });

  // Initialize learn more text variable with the arrow character
  var learnMoreText = $("#learn-more-shelter").html();
  // In case people want to change the badge wording later
  var what = "What is this?"

  // Learn more buttons for types of incidents
  $("#learn-more-shelter").click(function() {
    if ($(this).text() == what) {
      $("#shelter-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#shelter-more-info").hide("slow");
      $(this).text(what);
    }
  });

  $("#shelter").click(function() {
    if($(this).prop('checked') == true) {
      $("#shelter-more-info").show("slow");
      $("#learn-more-shelter").text("Close");
    } else if ($("#learn-more-shelter").text() == "Close"){
      $("#shelter-more-info").hide("slow");
      $("#learn-more-shelter").text(what);
    }
  });

  $("#learn-more-conditions").click(function() {
    if ($(this).text() == what) {
      $("#conditions-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#conditions-more-info").hide("slow");
      $(this).text(what);
    }
  });

  $("#conditions").click(function() {
    if($(this).prop('checked') == true) {
      $("#conditions-more-info").show("slow");
      $("#learn-more-conditions").text("Close");
    } else if ($("#learn-more-conditions").text() == "Close"){
      $("#conditions-more-info").hide("slow");
      $("#learn-more-conditions").text(what);
    }
  });

  $("#learn-more-outside").click(function() {
    if ($(this).text() == what) {
      $("#outside-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#outside-more-info").hide("slow");
      $(this).text(what);
    }
  });

  $("#outside").click(function() {
    if($(this).prop('checked') == true) {
      $("#outside-more-info").show("slow");
      $("#learn-more-outside").text("Close");
    } else if ($("#learn-more-outside").text() == "Close"){
      $("#outside-more-info").hide("slow");
      $("#learn-more-outside").text(what);
    }
  });

  $("#learn-more-violence").click(function() {
    if ($(this).text() == what) {
      $("#violence-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#violence-more-info").hide("slow");
      $(this).text(what);
    }
  });

  $("#violence").click(function() {
    if($(this).prop('checked') == true) {
      $("#violence-more-info").show("slow");
      $("#learn-more-violence").text("Close");
    } else if ($("#learn-more-violence").text() == "Close"){
      $("#violence-more-info").hide("slow");
      $("#learn-more-violence").text(what);
    }
  });

  $("#learn-more-illness").click(function() {
    if ($(this).text() == what) {
      $("#illness-more-info").show("slow");
      $(this).text("Close");
    } else {
      $("#illness-more-info").hide("slow");
      $(this).text(what);
    }
  });

  $("#illness").click(function() {
    if($(this).prop('checked') == true) {
      $("#illness-more-info").show("slow");
      $("#learn-more-illness").text("Close");
    } else if ($("#learn-more-illness").text() == "Close"){
      $("#illness-more-info").hide("slow");
      $("#learn-more-illness").text(what);
    }
  });

  // Unchecks everything if none of the above is selected
  $("#noneoftheabove").click(function() {
    if($(this).prop('checked') == true) {
      $("#shelter, #conditions, #outside, #violence, #illness").prop('checked', false);
      $("#shelter-more-info, #conditions-more-info, #outside-more-info, #violence-more-info, #illness-more-info").hide("slow");
    }
  });

  // Unchecks none of the above if something else is selected
  $("#shelter, #conditions, #outside, #violence, #illness").click(function() {
    if($(this).prop('checked') == true && $("#noneoftheabove").prop('checked') == true) {
      $("#noneoftheabove").prop('checked', false);
    }
  });

});
  

// Decide whether to go to form page 2 (if one of the correct types of incidents is selected)
// or go to null-report page for who to contact if they can't use the form
function redirectForm() {
  if($("#shelter").prop('checked') == true) {
    window.location = "/form-2";
  } else if ($("#conditions").prop('checked') == true) {
    window.location = "/form-2";
  } else if ($("#outside").prop('checked') == true) {
    window.location = "/form-2";
  } else if ($("#violence").prop('checked') == true) {
    window.location = "/form-2";
  } else if ($("#illness").prop('checked') == true) {
    window.location = "/form-2";
  } else if ($("#noneoftheabove").prop('checked') == true) {
    window.location = "/null-report";
  } else {
    // If nothing is checked
    $("#incident-error").removeClass("hidden");
  }
}
  


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
