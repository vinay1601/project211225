// const router = require("express").Router();
// const Property = require("../models/Property");

// router.get("/", async (req, res) => {
//   const data = await Property.find().limit(100);
//   res.json(data);
// });

// module.exports = router;


// routes/properties.js
const router = require("express").Router();
const Property = require("../models/Property");

router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Property.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Property.countDocuments(),
    ]);

    res.json({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

module.exports = router;
