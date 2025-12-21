const axios = require("axios");
const xml2js = require("xml2js");
const crypto = require("crypto");
const Property = require("../models/Property");
const toNumber = require("../utils/toNumber");

const XML_URL =
  "https://xml.propspace.com/feed/xml.php?cl=3710&pid=8245&acc=8807";

/* ---------- helpers ---------- */

function generateRef(item) {
  return (
    item.Property_Ref_No ||
    crypto
      .createHash("md5")
      .update(`${item.Property_Title}-${item.Price}-${item.Community}`)
      .digest("hex")
  );
}

function extractImages(item) {
  const imgs = item?.Images?.image;
  if (!imgs) return [];
  return Array.isArray(imgs) ? imgs : [imgs];
}

function cleanHTML(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------- main importer ---------- */

module.exports = async function importXML() {
  const { data } = await axios.get(XML_URL);

  const parser = new xml2js.Parser({
    explicitArray: false,
    trim: true,
  });

  const json = await parser.parseStringPromise(data);
  const listings = json?.Listings?.Listing || [];

  for (const item of listings) {
    const ref = generateRef(item);

    await Property.updateOne(
      { ref },
      {
        ref,

        adType: item.Ad_Type,
        unitType: item.Unit_Type,

        title: item.Property_Title || "",
        description: cleanHTML(item.Web_Remarks),

        price: toNumber(item.Price, 0),
        bedrooms: toNumber(item.Bedrooms),
        bathrooms: toNumber(item.No_of_Bathroom),
        rooms: toNumber(item.No_of_Rooms),
        builtupArea: toNumber(item.Unit_Builtup_Area),

        location: {
          emirate: item.Emirate,
          community: item.Community,
          latitude: toNumber(item.Latitude),
          longitude: toNumber(item.Longitude),
        },

        images: extractImages(item),

        agent: {
          name: item.Listing_Agent,
          phone: item.Listing_Agent_Phone,
          email: item.Listing_Agent_Email,
        },

        company: {
          name: item.company_name,
          logo: item.company_logo,
        },

        listingDates: {
          listedOn: new Date(item.Listing_Date),
          lastUpdated: new Date(item.Last_Updated),
        },

        offPlan: item.off_plan === "1",
        completionStatus: item.completion_status,
        permitNumber: item.permit_number,

        previewLink: item.PreviewLink,
      },
      { upsert: true }
    );
  }

  console.log(`✅ Imported ${listings.length} properties`);
};
