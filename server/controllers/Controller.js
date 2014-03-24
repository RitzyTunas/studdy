/* global require, exports*/
exports.create = function(tableName) {
  //== Dependencies =========================================
  var db = require('../db.js');
  var httpHelpers = require('../helpers/HttpHelpers');

  var table = db[tableName];

  //== Get ==================================================
  var get = function (req, res) {
    table.findAll()
      .success(function(data) {
        httpHelpers.sendResponse(res, data, 200);
      });
  };

  //== Post =================================================
  var post = function (req, res) {
    httpHelpers.collectData(req, function (data) {
      data = JSON.parse(data);

      table.create(data)
        .success(function() {
          httpHelpers.sendResponse(res, null, 201);
        });
    });
  };

  //== Options ==============================================
  var options = function (req, res) {
    httpHelpers.sendResponse(res, null, 200);
  };

  //== Actions ==============================================
  var actions = {
    'GET': get,
    'POST': post,
    'OPTIONS': options
  };

  //== Controller ===========================================
  return function (req, res) {
    var action = actions[req.method]; // GET / POST / OPTIONS

    if (action) {
      action(req, res);
    } else {
      httpHelpers.sendResponse(res, null, 403);
    }
  };
};
