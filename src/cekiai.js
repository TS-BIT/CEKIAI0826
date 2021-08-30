import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/cekiai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const cekiai = await getList();
    res.render("cekiai", { cekiai });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("cekis", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const cekis = await getOne(req.params.id);
    if (cekis.length > 0) {
      res.render("cekis", cekis[0]);
    } else {
      res.redirect("/cekiai");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/save", async (req, res) => {
  res.type("text/html");
  if (
    typeof req.body.data !== "string" ||
    req.body.data.trim() === ""
  ) {
    res.redirect("/cekiai");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.data,
      req.body.pardavejai_id,
      req.body.apmokejimo_tipai_id,
    );
    res.redirect("/cekiai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/cekiai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
