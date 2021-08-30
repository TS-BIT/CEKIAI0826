import { dbConnect, dbDisconnect, dbQuery } from "./db.js";

async function getList() {
  let conn;
  try {
    conn = await dbConnect();
    let r = await dbQuery(
      conn,
      "select id, pavadinimas from apmokejimo_tipai order by pavadinimas",
    );
    return r.results;
  } finally {
    try {
      await dbDisconnect(conn);
    } catch (err) {
      // ignored
    }
  }
}

async function getOne(id) {
  id = parseInt(id);
  if (isFinite(id)) {
    let conn;
    try {
      conn = await dbConnect();
      let r = await dbQuery(
        conn,
        "select id, pavadinimas from apmokejimo_tipai where id = ?",
        [id],
      );
      return r.results;
    } finally {
      try {
        await dbDisconnect(conn);
      } catch (err) {
        // ignored
      }
    }
  } else {
    throw new Error("Bad id");
  }
}

async function save(id, pavadinimas) {
  let conn;
  try {
    conn = await dbConnect();
    if (id) {
      let r = await dbQuery(
        conn,
        "update apmokejimo_tipai set pavadinimas = ? where id = ?;",
        [pavadinimas, id],
      );
      return r.results;
    } else {
      let r = await dbQuery(
        conn,
        "insert into apmokejimo_tipai (pavadinimas) values (?);",
        [pavadinimas],
      );
      return r.results;
    }
  } finally {
    try {
      await dbDisconnect(conn);
    } catch (err) {
      // ignored
    }
  }
}

async function deleteRecord(id) {
  id = parseInt(id);
  if (isFinite(id)) {
    let conn;
    try {
      conn = await dbConnect();
      let r = await dbQuery(
        conn,
        "delete from apmokejimo_tipai where id = ?",
        [id],
      );
    } finally {
      try {
        await dbDisconnect(conn);
      } catch (err) {
        // ignored
      }
    }
  } else {
    throw new Error("Bad id");
  }
}

export { deleteRecord, getList, getOne, save };
