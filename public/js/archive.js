$(document).ready(function() {
	// Initialize dropdowns
	$('select').material_select();

	// Initialize collapse button
	$(".button-collapse").sideNav();

	$("#owner_name").val("Jane Smith");
	$("#owner_number").val("412-123-4567");
	$("#owner_email").val("janesmith@gmail.com");

	$("#sort-by-select").change(function() {
		if ($("#sort-by").find("option:selected").val() == "1") {
			window.location = "/archiveByDate";
		} else if ($("#sort-by").find("option:selected").val() == "2") {
			window.location = "/archiveByUrgency";
		}
	});
});

function addToItinerary(id) {
  $.post("/addToItinerary", { data: id })
      .done(function( data ) {
        window.location = "/dashboard";
    });
}

function addAnimal(id) {
 	$("#animal-details").append(animalDetails);
}

function addNote(id) {
 	$("#notes").append(note);
}

var note = '<div class="row margin-top-20">\
                        <div class="row card-panel blue-grey lighten-5">\
                            <div class="bold-label">Notes</div>\
                            \
                            <div class="row">\
                                <div class="input-field col s12">\
                                <textarea id="textarea1" class="materialize-textarea"></textarea>\
                            </div>\
                        </div>\
                    </div>';

var animalDetails = '<div class="row margin-top-20">\
			<div class="row card-panel blue-grey lighten-5">\
			<div class="input-field col s12">\
			    <div class="bold-label">Animal Name</div>\
			    <input placeholder="Name of Animal" id="email" type="text">\
			</div>\
			<div class="input-field col s12">\
			        <div class="bold-label">Type of Animal</div>\
			        <select>\
			            <option value="" disabled selected>Choose</option>\
			            <option value="1">Dog</option>\
			            <option value="2">Cat</option>\
			            <option value="3">Bird</option>\
			            <option value="4">Chicken</option>\
			            <option value="5">Small mammal (rodent,rabbit,etc)</option>\
			            <option value="6">Farm Animal (horse, pig, etc)</option>\
			        </select>\
			</div>\
			<div class="input-field col s12">\
			    <div class="bold-label">Animal Description</div>\
			    <input placeholder="Describe the animal in detail" id="email" type="text">\
			</div>\
			<div class="col s12">\
			    <div class="bold-label">Add Photos</div>\
			    <a class="btn-floating indigo btn-large waves-light"><i class="material-icons">add_a_photo</i></a>\
			</div>\
			</div>';