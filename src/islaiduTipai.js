import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/islaiduTipai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const islaiduTipai = await getList();
    res.render("islaiduTipai", { islaiduTipai });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("islaiduTipas", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const islaiduTipas = await getOne(req.params.id);
    if (islaiduTipas.length > 0) {
      res.render("islaiduTipas", islaiduTipas[0]);
    } else {
      res.redirect("/islaiduTipai");
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
    res.redirect("/islaiduTipai");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.pavadinimas,
    );
    res.redirect("/islaiduTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/islaiduTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
