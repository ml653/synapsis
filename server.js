const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000, console.log("Synapsis is listening on port 3000"));
