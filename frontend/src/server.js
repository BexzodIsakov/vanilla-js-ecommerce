const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public/")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});

app.listen(port, () => {
  console.log(`App is live on http://localhost:${port}`);
});
