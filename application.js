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

	// Learn more buttons for types of incidents
	$("#learn-more-shelter").click(function() {
		if ($(this).text() == "Close") {
			$("#shelter-more-info").hide("slow");
			$(this).text("Learn more  ►");
		} else {
			$("#shelter-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-conditions").click(function() {
		if ($(this).text() == "Close") {
			$("#conditions-more-info").hide("slow");
			$(this).text("Learn more  ►");
		} else {
			$("#conditions-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-outside").click(function() {
		if ($(this).text() == "Close") {
			$("#outside-more-info").hide("slow");
			$(this).text("Learn more  ►");
		} else {
			$("#outside-more-info").show("slow");
			$(this).text("Close");
		}
	});
});