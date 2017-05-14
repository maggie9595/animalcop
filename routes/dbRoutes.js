// include my model for this application
var mongoModel = require("../models/mongoModel.js")

var ObjectId = require('mongodb').ObjectId; 

var newReports = "";
var inProgressReports = "";
var itinerary = "";

// Define the routes for this controller
exports.init = function(app) {
  app.get('/', index); // App home page
  app.get('/form-1', form1); // Form page 1
  app.post('/form-1', form1Post); // Form page 1 post info
  app.get('/form-2', form2); // Form page 2
  app.post('/form-2', submitForm); // Submit form
  app.get('/confirmation', confirmation); // Form submitted confirmation
  app.get('/null-report', nullReport); // Null report when the incident is none of the above

  app.get('/dashboard', dashboard); // Humane officer dashboard
  app.get('/archive', archive); // Humane officer archived cases page
  app.get('/archiveByUrgency', archiveByUrgency); // Humane officer archived cases page
  app.get('/archiveByDate', archiveByDate); // Humane officer archived cases page
  app.get('/report/:id', getReport); // Humane officer report notes for each case
  app.get('/account', account); // Humane officer account page
  app.post('/addToItinerary', addToItinerary); // Add a case to the itinerary
  app.post('/removeFromItinerary', removeFromItinerary); // Remove a case from the itinerary
}

  // No path:  display instructions for use
  index = function(req, res) {
    res.render('index');
  };

  // Display form page 1
  form1 = function(req, res) {
    res.render('form-1');
  };

  // Display form page 2
  form1Post = function(req, res) {
    // Save the info from page 1 
    mongoModel.saveInfo(req.body.data);
    res.end();
  };

  // Display form page 2
  form2 = function(req, res) {
    res.render('form-2');
  };

  // Submit form and display form submitted confirmation page
  submitForm = function(req, res) {
    mongoModel.create("reports", 
                      req.body,
                      function(result) {
                        // result equal to true means create was successful
                        var success = (result ? "Create successful" : "Create unsuccessful");
                        console.log(success);
                        res.render('confirmation');
                      });
  };

  // Display confirmation page
  confirmation = function(req, res) {
    res.render('confirmation');
  };

  // Display null report page
  nullReport = function(req, res) {
    res.render('null-report');
  };

  // Display humane officer dashboard
  dashboard = function(req, res) {
    // Get all new reports from database
    mongoModel.retrieve(
      "reports", 
      {"status": "new", "itinerary": false},
      function(modelData) {
        if (modelData.length) {
          newReports = modelData;
        } else {
          newReports = "";
          console.log("No new reports in database");
        }
      });

    // Get all in progress reports from database
    mongoModel.retrieve(
      "reports", 
      {"status": "inProgress", "itinerary": false},
      function(modelData) {
        if (modelData.length) {
          inProgressReports = modelData;
        } else {
          inProgressReports = "";
          console.log("No in progress reports in database");
        }
      });

    // Get reports in the itinerary from database
    mongoModel.retrieve(
      "reports", 
      {"itinerary": true},
      function(modelData) {
        if (modelData.length) {
          itinerary = modelData;
        } else {
          itinerary = "";
          console.log("No reports in itinerary");
        }
      });

    res.render('dashboard', {newReports: newReports, inProgressReports: inProgressReports, itinerary: itinerary});
  };

  // Display humane officer archived cases page
  archive = function(req, res) {
    mongoModel.retrieve(
      "reports", 
      {"status": "completed"},
      function(modelData) {
        if (modelData.length) {
          res.render('archive', {archivedReports: modelData});
        } else {
          console.log("There are no reports in the archive");
          res.render('archive', {archivedReports: ""});
        }
      });
  };

  // Display humane officer archived cases page sorted by descending date
  archiveByDate = function(req, res) {
    mongoModel.retrieve(
      "reports", 
      {"status": "completed"},
      function(modelData) {
        if (modelData.length) {
          modelData.sort(function(a,b){return b.received > a.received});
          res.render('archive', {archivedReports: modelData});
        } else {
          console.log("There are no reports in the archive");
          res.render('archive', {archivedReports: ""});
        }
      });
  };

  // Display humane officer archived cases page
  archiveByUrgency = function(req, res) {
    mongoModel.retrieve(
      "reports", 
      {"status": "completed"},
      function(modelData) {
        if (modelData.length) {
          res.render('archive', {archivedReports: modelData});
        } else {
          console.log("There are no reports in the archive");
          res.render('archive', {archivedReports: ""});
        }
      });
  };

  // Display report notes page for each individual report
  getReport = function(req, res) {
    mongoModel.retrieve(
      "reports", 
      {"_id": ObjectId(req.params.id)},
      function(modelData) {
        if (modelData.length) {
          console.log(modelData);
          res.render('report', {currentReport: modelData});
        } else {
          console.log("Report not found");
        }
      });
  };

  // Display humane officer account page
  account = function(req, res) {
    res.render('account');
  };

  // Add a case to itinerary
  addToItinerary = function(req, res) {
    mongoModel.update("reports", {"_id": ObjectId(req.body.data)}, {$set: {"itinerary": true}},
      function(status) {
        res.end();
      });
  }

  // Remove a case from the itinerary
  removeFromItinerary = function(req, res) {
    mongoModel.update("reports", {"_id": ObjectId(req.body.data)}, {$set: {"itinerary": false}},
      function(status) {
        res.end();
      });
  }


/********** CRUD Retrieve (or Read) *******************************************
 * Take the object defined in the query string and do the Retrieve
 * operation in mongoModel.  (Note: The mongoModel method was called "find"
 * when we discussed this in class but I changed it to "retrieve" to be
 * consistent with CRUD operations.)
 */ 

doRetrieve = function(req, res){
  /*
   * Call the model Retrieve with:
   *  - The collection to Retrieve from
   *  - The object to lookup in the model, from the request query string
   *  - As discussed above, an anonymous callback function to be called by the
   *    model once the retrieve has been successful.
   * modelData is an array of objects returned as a result of the Retrieve
   */
  mongoModel.retrieve(
    req.params.collection, 
    req.query,
		function(modelData) {
		  if (modelData.length) {
        res.render('results',{title: 'Mongo Demo', obj: modelData});
      } else {
        var message = "No documents with "+JSON.stringify(req.query)+ 
                      " in collection "+req.params.collection+" found.";
        res.render('message', {title: 'Mongo Demo', obj: message});
      }
		});
}

/********** CRUD Update *******************************************************
 * Take the MongoDB update object defined in the request body and do the
 * update.  (I understand this is bad form for it assumes that the client
 * has knowledge of the structure of the database behind the model.  I did
 * this to keep the example very general for any collection of any documents.
 * You should not do this in your project for you know exactly what collection
 * you are using and the content of the documents you are storing to them.)
 */ 
doUpdate = function(req, res){
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};
  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.render('message', {title: 'Mongo Demo', obj: "No update operation defined"});
    return;
  }
  var update = JSON.parse(req.body.update);
  /*
   * Call the model Update with:
   *  - The collection to update
   *  - The filter to select what documents to update
   *  - The update operation
   *    E.g. the request body string:
   *      find={"name":"pear"}&update={"$set":{"leaves":"green"}}
   *      becomes filter={"name":"pear"}
   *      and update={"$set":{"leaves":"green"}}
   *  - As discussed above, an anonymous callback function to be called by the
   *    model once the update has been successful.
   */
  mongoModel.update(  req.params.collection, filter, update,
		                  function(status) {
              				  res.render('message',{title: 'Mongo Demo', obj: status});
		                  });
}

/********** CRUD Delete *******************************************************
 * The delete route handler is left as an exercise for you to define.
 */