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
});