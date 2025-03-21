const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", async (req, res) => {
  const query = "select * from testitemdeatils";
  const [result] = await db.execute(query);
  try {
    return res.json(result);
  } catch (err) {
    return res.send({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  const { testitemcode, testitemname, isActive } = req.body;
  if (!testitemcode || !testitemname || isActive) {
    return res.status(403).send({ message: "required all fields" });
  }
  try {
    const query =
      "insert into testitemdetails(testitemcode,testitemname,isActive) values (?,?,?)";
    const [result] = await db.execute(query, [
      testitemcode,
      testitemname,
      isActive,
    ]);
    return res.json({ message: "insert successfully" });
  } catch (err) {
    return res.send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { testitemcode } = req.params;
  const { testitemname, isActive } = req.body;
  if (!testitemname || isActive) {
    return res.status(403).send({ message: "required all fields" });
  }
  try {
    const query =
      "update testitemdetails set testitemname=?,isActive=? where testitemcode=?";
    const [result] = await db.execute(query, [
      testitemname,
      isActive,
      testitemcode,
    ]);
    if (result.affectedRows === 0) {
      return res.json({ message: "invalid testitemcode" });
    }
    return res.send({ message: "update successfully" });
  } catch (err) {
    return res.send({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { testitemcode } = req.params;
  try {
    const query =
      "insert into testitemcode(testitemcode,testitemname,isActive) values (?,?,?)";
    const [result] = await db.execute(query, [
      testitemcode,
      testitemname,
      isActive,
    ]);
  } catch (err) {
    return res.send({ message: err.message });
  }
});
module.exports = router;
