const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`App live at http://localhost:${port}/`));

app.get('/', (req, res) => {
    res.render("index.ejs")
});

app.post("/submit", (req, res) => {
  
  console.log(req.body.barcode);

  res.redirect("/")
})