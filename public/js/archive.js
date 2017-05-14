$(document).ready(function() {
	// Initialize dropdowns
	$('select').material_select();

	// Initialize collapse button
  $(".button-collapse").sideNav();
});

function addToItinerary(id) {
  $.post("/addToItinerary", { data: id })
      .done(function( data ) {
        window.location = "/dashboard";
    });
}