const express = require("express");
const router = express.Router();
const importXML = require("../services/xmlImporter");

/**
 * POST /api/import
 * Import XML ONCE manually
 */
router.post("/", async (req, res) => {
  try {
    await importXML();
    res.json({ message: "XML import completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "XML import failed" });
  }
});

module.exports = router;
