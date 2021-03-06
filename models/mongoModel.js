var mongoClient = require('mongodb').MongoClient;

// database running on mLab
var connection_string = 'mongodb://admin:admin@ds131878.mlab.com:31878/animalcop'

// Global variable of the connected database
var mongoDB; 

// Use connect method to connect to the MongoDB server
mongoClient.connect(connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: " + connection_string);
  mongoDB = db; // Make reference to db globally available
})

// Incident types from form page 1
var incidentTypes = "";

/********** CRUD Create -> Mongo insert ***************************************
 * @param {string} collection - The collection within the database
 * @param {object} data - The object to insert as a MongoDB document
 * @param {function} callback - Function to call upon insert completion
 *
 * See the API for more information on insert:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne
 */
exports.create = function(collection, data, callback) {
  data.incidentTypes = incidentTypes;
  data.status = "new";
  data.itinerary = false;

  var today = new Date();
  data.received = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
  console.log(data);
  
  // Do an asynchronous insert into the given collection
  mongoDB.collection(collection).insertOne(
    data,                     // the object to be inserted
    function(err, status) {   // callback upon completion
      if (err) doError(err);
      // use the callback function supplied by the controller to pass
      // back true if successful else false
      var success = (status.result.n == 1 ? true : false);
      callback(success);
    });
}

/********** CRUD Retrieve -> Mongo find ***************************************
 * @param {string} collection - The collection within the database
 * @param {object} query - The query object to search with
 * @param {function} callback - Function to call upon completion
 *
 * See the API for more information on find:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#find
 * and toArray:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#toArray
 */
exports.retrieve = function(collection, query, callback) {
  /*
   * The find sets up the cursor which you can iterate over and each
   * iteration does the actual retrieve. toArray asynchronously retrieves the
   * whole result set and returns an array.
   */
  mongoDB.collection(collection).find(query).toArray(function(err, docs) {
    if (err) doError(err);
    // docs are MongoDB documents, returned as an array of JavaScript objects
    // Use the callback provided by the controller to send back the docs.
    callback(docs);
  });
}

/********** CRUD Update -> Mongo updateMany ***********************************
 * @param {string} collection - The collection within the database
 * @param {object} filter - The MongoDB filter
 * @param {object} update - The update operation to perform
 * @param {function} callback - Function to call upon completion
 *
 * See the API for more information on insert:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#updateMany
 */
exports.update = function(collection, filter, update, callback) {
  mongoDB
    .collection(collection)     // The collection to update
    .updateOne(                // Use updateOne to only update 1 document
      filter,                   // Filter selects which documents to update
      update,                   // The update operation
      {upsert:false},            // If document not found, insert one with this update
                                // Set upsert false (default) to not do insert
      function(err, status) {   // Callback upon error or success
        if (err) doError(err);
        callback('Modified '+ status.modifiedCount 
                 +' and added '+ status.upsertedCount+" documents");
        });
}

// Helper to save incident types from form page 1
exports.saveInfo = function(data) {
  incidentTypes = data;
  console.log("incident types: " + incidentTypes);
}


var doError = function(e) {
    console.error("ERROR: " + e);
    throw new Error(e);
}