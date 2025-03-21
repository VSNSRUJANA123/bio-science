const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/db");
app.use(express.json());
app.use(cors({}));
const PORT = process.env.PORT || 5000;
app.use("/sponsor", require("./routers/sponser"));
app.use("/testitemdeatils", require("./routers/tableItem"));
app.get("/working", (req, res) => {
  return res.send({ message: "hi welcome to paint application" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
