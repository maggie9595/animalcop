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
	var learnMoreText = $("#learn-more-shelter").html();

	// Learn more buttons for types of incidents
	$("#learn-more-shelter").click(function() {
		if ($(this).text() == "Close") {
			$("#shelter-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#shelter-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-conditions").click(function() {
		if ($(this).text() == "Close") {
			$("#conditions-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#conditions-more-info").show("slow");
			$(this).text("Close");
		}
	});

	$("#learn-more-outside").click(function() {
		if ($(this).text() == "Close") {
			$("#outside-more-info").hide("slow");
			$(this).html(learnMoreText);
		} else {
			$("#outside-more-info").show("slow");
			$(this).text("Close");
		}
	});
});