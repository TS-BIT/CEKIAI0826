import { dbConnect, dbDisconnect, dbQuery } from "./db.js";

async function getList() {
  let conn;
  try {
    conn = await dbConnect();
    let r = await dbQuery(
      conn,
      "select id, data, pardavejai_id, apmokejimo_tipai_id from cekiai order by data",
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
        "select id, data, pardavejai_id, apmokejimo_tipai_id from cekiai where id = ?",
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

async function save(id, data, pardavejai_id, apmokejimo_tipai_id) {
  let conn;
  try {
    conn = await dbConnect();
    if (id) {
      let r = await dbQuery(
        conn,
        "update cekiai set data = ? where id = ?, pardavejai_id = ?, apmokejimo_tipai_id = ?",
        [data, id, pardavejai_id, apmokejimo_tipai_id],
      );
      return r.results;
    } else {
      let r = await dbQuery(
        conn,
        "insert into cekiai (data) values (?), (pardavejai_id) values (?), (apmokejimo_tipai_id) values (?)",
        [data, pardavejai_id, apmokejimo_tipai_id],
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
        "delete from cekiai where id = ?",
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
