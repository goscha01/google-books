'use strict';

const express = require('express');
const app = express();
require("./routes")(app);
const PORT = 8000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
