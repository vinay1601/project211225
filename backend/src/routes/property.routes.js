// const router = require("express").Router();
// const Property = require("../models/Property");

// router.get("/", async (req, res) => {
//   const data = await Property.find().limit(100);
//   res.json(data);
// });

// module.exports = router;


// routes/properties.js
// const router = require("express").Router();
// const Property = require("../models/Property");

// router.get("/", async (req, res) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const limit = Math.min(50, parseInt(req.query.limit) || 12);
//     const skip = (page - 1) * limit;

//     const [data, total] = await Promise.all([
//       Property.find()
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       Property.countDocuments(),
//     ]);

//     res.json({
//       data,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch properties" });
//   }
// });

// module.exports = router;


// routes/properties.js
const router = require("express").Router();
const Property = require("../models/Property");

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const cursor = req.query.cursor;

    const query = cursor
      ? { createdAt: { $lt: new Date(cursor) } } // fetch past data
      : {};

    const data = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(limit + 1) // extra record to detect next page
      .lean(); // performance boost

    const hasMore = data.length > limit;
    if (hasMore) data.pop();

    res.json({
      data,
      nextCursor: hasMore ? data[data.length - 1].createdAt : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

module.exports = router;
