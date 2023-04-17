import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';
import session from "express-session";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set("view engine", "ejs");
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});


const router = express.Router();

// Configuration de la session
app.use(
  session({
    secret: process.env.MA_CLE_SECRETE || "ma-cle-secrete-par-defaut",
    resave: false,
    saveUninitialized: true,
  })
);
const port = 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


// Route principale
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", function (req, res) {
  res.render("login");
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
router.get('/cartes/:num', function(req, res) {
  const cartesNum = req.params.num;
  res.render('cartesNum', { num: cartesNum });
});
router.get("/marchands", (req, res) => {
  res.render("marchands");
});
router.get("/munitions", (req, res) => {
  res.render("munitions");
});
router.get("/chat", (req, res) => {
  res.render("chat", {
    baseURL: req.app.locals.baseURL,
  });
});


app.post("/login", function (req, res) {
  const login = req.body.login;
  const password = req.body.password;

  if (login === "admin" && password === "admin") {
    req.session.loggedin = true;
    req.session.username = login;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/");
  });
});
app.use(router);










