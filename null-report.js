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