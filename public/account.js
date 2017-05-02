$(document).ready(function() {
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
	
  $("#email").val("janedoe@arl.org");
  $("#phone").val("412-123-4567");
});