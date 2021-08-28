import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/mokejimoTipai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const mokejimoTipai = await getList();
    res.render("mokejimoTipai", { mokejimoTipai });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("mokejimoTipas", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const mokejimoTipas = await getOne(req.params.id);
    if (mokejimoTipas.length > 0) {
      res.render("mokejimoTipas", mokejimoTipas[0]);
    } else {
      res.redirect("/mokejimoTipai");
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
    res.redirect("/mokejimoTipai");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.pavadinimas,
    );
    res.redirect("/mokejimoTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/mokejimoTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
