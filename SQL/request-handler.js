var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;


exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;
  console.log('received post')
  var resultsCallback = function (results) {
      var chat = {
        message: message.message,
        userid: results[0].ID,
        roomname: message.roomname
      };

      console.log('in results callback with user info turned chat object', chat, results);
      //saveMessage should make a mysql query and post information to the database,
      //and then invoke sendResponse to send res back to client
      saveMessage(chat.message, chat.userid, chat.roomname, function (message) {
        console.log('results callback is saving a message:', message);
        serverHelpers.sendResponse(res, message);
      });
  };

  //grab POST request and pass data to callback
  parseData(req, function(_, msg) {
      message = msg;//parsed POST data
      //query database for UserID, if results===true pass results
      //into resultsCallback, else create new user with saveUser
      findUser(message.username, function (err, results) {
        //results = username messages from database
        // no results/0 results
        if (!results || !results.length) {
          // create the user, then post the message
          saveUser(message.username, resultsCallback);
        } else {
          // user exists, post the message to this user
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(err, messages) {
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
