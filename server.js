require("dotenv").config();
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const PORT = process.env.PORT || 3005;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// Connect to the database and console log the port #
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port: ${PORT}`);
    })
});

