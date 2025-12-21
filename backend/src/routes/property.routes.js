const router = require("express").Router();
const Property = require("../models/Property");

router.get("/", async (req, res) => {
  const data = await Property.find().limit(20);
  res.json(data);
});

module.exports = router;
