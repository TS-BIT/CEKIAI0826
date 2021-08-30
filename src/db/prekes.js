import { dbConnect, dbDisconnect, dbQuery } from "./db.js";

async function getList() {
  let conn;
  try {
    conn = await dbConnect();
    let r = await dbQuery(
      conn,
      "select id, pavadinimas, kaina, cekiai_id, islaidu_tipai_id from prekes order by pavadinimas",
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
        "select id, pavadinimas, kaina, cekiai_id, islaidu_tipai_id from prekes where id = ?",
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

async function save(id, pavadinimas, kaina, cekiai_id, islaidu_tipai_id) {
  let conn;
  try {
    conn = await dbConnect();
    if (id) {
      let r = await dbQuery(
        conn,
        "update prekes set pavadinimas = ? where id = ?, kaina = ?, cekiai_id = ?, islaidu_tipai_id = ?",
        [pavadinimas, id, kaina, cekiai_id, islaidu_tipai_id],
      );
      return r.results;
    } else {
      let r = await dbQuery(
        conn,
        "insert into prekes (pavadinimas) values (?), (kaina) values (?), (cekiai_id) values (?), (islaidu_tipai_id) values (?)",
        [pavadinimas, kaina, cekiai_id, islaidu_tipai_id],
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
        "delete from prekes where id = ?",
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
