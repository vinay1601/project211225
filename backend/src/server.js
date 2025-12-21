require("dotenv").config();
const connectDB = require("./config/db");
const importXML = require("./services/xmlImporter");
const app = require("./app");

(async () => {
  await connectDB();
//   await importXML();

  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
})();
