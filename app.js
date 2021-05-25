const express = require("express");
const app = express();
const users = require("./routes/users");
const newsletter = require("./routes/newsletter");

app.use(express.json());

/** Routes */
app.use("/api/users", users);
app.use("/api/newsletter", newsletter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
