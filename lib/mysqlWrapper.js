const pool = require('./db');
exports.executeQuery = function ({ query, params }) {
  // static createQuery({ query, params }) {
  // console.log(query);
  // console.log("params " + params);
  // return;
  return new Promise((succeed, fail) => {
    pool.getConnection((err, connection) => {
      //If an error was passed getting a connection, fails the promise sending it to the caller
      if (err) {
        return fail(err);
      }

      //Runs the query
      connection.query(query, params, (err, rows) => {
        console.log('params', params);
        //Releases the connection
        connection.release();

        //If an error was passed running the query, fails the promise sending it to the caller
        if (err) {
          // console.log("api failed", err);
          return fail(err);
        }
        // console.log("res ", rows);
        //Fulfills the promise
        return succeed(rows);
      });
    });
  });
};
exports.createTransactionalQuery = function ({ query, params, connection }) {
  // static createTransactionalQuery({ query, params, connection }) {
  // console.log(query)
  // console.log(params)
  return new Promise((succeed, fail) => {
    connection.query(query, params, (err, rows) => {
      connection.release();
      //If an error was passed running the query, fails the promise sending it to the caller
      if (err) {
        return fail(err);
      }

      //Fulfills the promise
      // console.log(rows);
      return succeed(rows);
      if (connection != null) connection.release();
    });
  });
};
