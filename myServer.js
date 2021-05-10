const express = require("express");

/* Morgan is used as a request logger for HTTP middleware in Node.js.  It is used to make the process
   of logging requests to the web app simpler.  */
const morgan = require("morgan");

/* Importing the file (index.js) that contains the server routes. */

const serverRoutes = require("./routes/index");

/* Initialising express. */
const app = express();

/* App middleware. */
/* I am adding the code below (app.use) in order for the application to be able to accept
   incoming JSON requests. */
app.use(express.json());
app.use(morgan("dev"));

/* Telling the server that at the endpoint '/api', the routes defined in the index.js
   file should be used. */

app.use("/api", serverRoutes);

/* Setting the port as an environment variable and I am making
   the server listen on port 8080. */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
