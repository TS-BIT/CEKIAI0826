import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/pardavejai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const pardavejai = await getList();
    res.render("pardavejai", { pardavejai });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("pardavejas", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const pardavejas = await getOne(req.params.id);
    if (pardavejas.length > 0) {
      res.render("pardavejas", pardavejas[0]);
    } else {
      res.redirect("/pardavejai");
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
    res.redirect("/pardavejai");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.pavadinimas,
    );
    res.redirect("/pardavejai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/pardavejai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
