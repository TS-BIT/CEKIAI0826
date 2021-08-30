import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/prekes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const prekes = await getList();
    res.render("prekes", { prekes });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("preke", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const preke = await getOne(req.params.id);
    if (preke.length > 0) {
      res.render("preke", preke[0]);
    } else {
      res.redirect("/prekes");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/save", async (req, res) => {
  res.type("text/html");
  if (
    typeof req.body.pavadinimas !== "string" ||
    req.body.pavadinimas.trim() === ""
  ) {
    res.redirect("/prekes");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.pavadinimas,
      req.body.kaina,
      req.body.cekiai_id,
      req.body.islaidu_tipai_id,
    );
    res.redirect("/prekes");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/prekes");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
