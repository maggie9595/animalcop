// Save latitude and longitude to use to submit form later
var latitude;
var longitude;

$(document).ready(function() {
  // Initialize the datepicker
  $('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 5,
    format: 'mmmm d, yyyy',
  });

  // Initialize dropdowns
  $('select').material_select();

  $('#pac-input').keypress(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  });

  // Submit form button
  $('#submit-button').click(function(event) {
    event.preventDefault();

    var validForm = true;

    // Make sure all required questions have been answered
    if($("#pac-input").val().length == 0) {
      validForm = false;
      $("#location-error").removeClass("hidden");
    } else {
      validForm = validForm && true;
      $("#location-error").addClass("hidden");
    }

    if(($("#date").val().length == 0) && ($("#time").val().length == 0) && ($("#ongoing").prop('checked') == false)) {
      validForm = false;
      $("#date-error").removeClass("hidden");
    } else {
      validForm = validForm && true;
      $("#date-error").addClass("hidden");
    }

    if($("#number-animals").find("option:selected").val() == "") {
      validForm = false;
      $("#number-animals-error").removeClass("hidden");
    } else {
      validForm = validForm && true;
      $("#number-animals-error").addClass("hidden");
    }

    if(($("#type-animals input:checkbox:checked").length == 0) && ($("#other-type-animal").val().length == 0)) {
      validForm = false;
      $("#type-animals-error").removeClass("hidden");
    } else {
      validForm = validForm && true;
      $("#type-animals-error").addClass("hidden");
    }

    if($("#description").val().length == 0) {
      validForm = false;
      $("#description-error").removeClass("hidden");
    } else {
      validForm = validForm && true;
      $("#description-error").addClass("hidden");
    }

    // Submit the form only if all required fields have been answered/it is valid
    if(validForm) {
      // Get all animal types selected
      var animalTypes = "";
      if($("#dog").prop('checked') == true) {
        animalTypes += '1';
      }
      if($("#cat").prop('checked') == true) {
        animalTypes += '2';
      }
      if($("#bird").prop('checked') == true) {
        animalTypes += '3';
      }
      if($("#chicken").prop('checked') == true) {
        animalTypes += '4';
      }
      if($("#mammal").prop('checked') == true) {
        animalTypes += '5';
      }
      if($("#farm").prop('checked') == true) {
        animalTypes += '6';
      }
      if($("#unknown").prop('checked') == true) {
        animalTypes += '7';
      }

      // Get all animal conditions selected
      var animalConditions = "";
      if($("#wounds").prop('checked') == true) {
        animalConditions += '1';
      }
      if($("#hunger").prop('checked') == true) {
        animalConditions += '2';
      }
      if($("#shelter").prop('checked') == true) {
        animalConditions += '3';
      }

      // Submit form
      $.post("/form-2", 
        { 
          address: $("#pac-input").val(),
          latitude: latitude,
          longitude: longitude,
          date: $("#date").val(),
          time: $("#time").val() + " " + $("#time-of-day").find("option:selected").val(),
          ongoing: $("#ongoing").prop('checked'),
          owner: $("#owner-name").val(),
          numberAnimals: $("#number-animals").find("option:selected").val(),
          animalTypes: animalTypes,
          otherAnimalType: $("#other-type-animal").val(),
          description: $("#description").val(),
          animalConditions: animalConditions,
          additionalDetails: $("#details").val(),
          reporterName: $("#reporter-name").val(),
          reporterNumber: $("#callback-number").val(),
          reporterEmail: $("#email").val()
        }).done(function( data ) {
          window.location = "/confirmation";
      });
    } else {
      window.scrollTo(0, 0);
      $("#error-text").removeClass("hidden");
    }
    
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
  var incidentTypes = "";
  
  if($("#shelter").prop('checked') == true) {
    incidentTypes += '1';
  }
  if ($("#conditions").prop('checked') == true) {
    incidentTypes += '2';
  }
  if ($("#outside").prop('checked') == true) {
    incidentTypes += '3';
  }
  if ($("#violence").prop('checked') == true) {
    incidentTypes += '4';
  }
  if ($("#illness").prop('checked') == true) {
    incidentTypes += '5';
  }

  if ($("#noneoftheabove").prop('checked') == true) {
    window.location = "/null-report";
  } 

  // If nothing is checked
  if(incidentTypes == "") {
    $("#incident-error").removeClass("hidden");
    window.scrollTo(0, 0);
  } else {
    // Save form 1 information and send to form page 2
    $.post("/form-1", { data: incidentTypes })
      .done(function( data ) {
        window.location = "/form-2";
    });
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
    // Save variables to use when submitting form
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

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

    // Save variables to use when submitting form
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();

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
