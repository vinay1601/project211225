const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    ref: { type: String, unique: true, index: true },

    adType: String,
    unitType: String,

    title: String,
    description: String,

    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    rooms: Number,
    builtupArea: Number,

    location: {
      emirate: String,
      community: String,
      latitude: Number,
      longitude: Number,
    },

    images: [String],

    agent: {
      name: String,
      phone: String,
      email: String,
    },

    company: {
      name: String,
      logo: String,
    },

    listingDates: {
      listedOn: Date,
      lastUpdated: Date,
    },

    offPlan: Boolean,
    completionStatus: String,
    permitNumber: String,

    previewLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
