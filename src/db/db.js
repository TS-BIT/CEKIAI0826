import mysql from "mysql";

const connectOptions = {
    host: "localhost",
    user: "prog1",
    password: "nodejs123456",
    database: "cekiai",
    multipleStatements: true,
};

function dbConnect() {
  const conn = mysql.createConnection(connectOptions);
  return new Promise((resolve, reject) => {
    conn.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(conn);
    });
  });
}

function dbDisconnect(conn) {
  if (conn) {
    return new Promise((resolve, reject) => {
      conn.end((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  } else {
    return Promise.resolve();
  }
}

function dbQuery(conn, ...args) {
  return new Promise((resolve, reject) => {
    conn.query(...args, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        results,
        fields,
      });
    });
  });
}

export { dbConnect, dbDisconnect, dbQuery };
