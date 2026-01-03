const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

const routes = {
  "/": path.join(process.cwd(), "src", "routes", "index.html"),
  "/about": path.join(process.cwd(), "src", "routes", "about.html"),
};

const getRouteFile = function (req, res, next) {
  console.log(req.path);
  const file = routes[req.path];

  if (!file) res.status(404).send("Not found!");

  req.filePath = file;
  next();
};

app.use("/styles", express.static(path.join(process.cwd(), "src", "styles")));
app.use("/scripts", express.static(path.join(process.cwd(), "src", "scripts")));

// custom route handler for client pages
app.use(getRouteFile);

app.get("/", (req, res) => {
  res.sendFile(req.filePath);
});

app.get("/about", (req, res) => {
  res.sendFile(req.filePath);
});

app.use((_, res) => {
  res
    .status(404)
    .sendFile(path.join(process.cwd(), "src", "routes", "404.html"));
});

app.listen(port, () => {
  console.log(`App is live on http://localhost:${port}`);
});
