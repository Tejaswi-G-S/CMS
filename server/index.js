//Node version V16.16.0

//Connection establishment "Node-React" using Express
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3777,
  cors = require("cors"), 
  db = require('./api/query')

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/api/retrieveData/:id", db.retrieveData);
app.post("/api/storeData/:id", db.storeData);
