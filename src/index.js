var compression = require('compression');
var express = require("express");

var Insert = require("./routes/Insert");
var Measure = require("./routes/Measure");

var app = express();
app.use(express.json());
app.use(compression());

Insert.post(app);

Measure.post(app);
Measure.put(app);

app.listen(8000, () => console.log(`Example app listening on port 8000`));
