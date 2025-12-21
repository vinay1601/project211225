require("dotenv").config();
const connectDB = require("./config/db");
const importXML = require("./services/xmlImporter");
const app = require("./app");
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
//   await importXML();

  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
})();
