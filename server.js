import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.set("view engine", "ejs");
const router = express.Router();

// Route principale
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/home", (req, res) => {
  res.render("home");
});
router.get("/articles", (req, res) => {
  res.render("articles");
});
router.get("/boss", (req, res) => {
  res.render("boss");
});
router.get("/cartes", (req, res) => {
  res.render("cartes");
});
router.get("/marchands", (req, res) => {
  res.render("marchands");
});
router.get("/munitions", (req, res) => {
  res.render("munitions");
});

app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
