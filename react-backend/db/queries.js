var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/userlist";
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
  console.log("get all users");
  db
    .any("select * from users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL users"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  db
    .any("select * from users where username = ${username}", req.params)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched one user"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateSingleUser(req, res, next) {
  db
    .none(
      "update users set username = ${newName} where username = ${username}",
      req.body
    )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        message: "Changed one user"
      });
    })
    .catch(function(err) {
      res.status(409).send(err.detail);
    });
}

function createUser(req, res, next) {
  console.log("create user");
  db
    .none("insert into users(username) values(${username})", req.body)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one user"
      });
    })
    .catch(function(err) {
      res.status(409).send(err.detail);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateSingleUser: updateSingleUser
};
