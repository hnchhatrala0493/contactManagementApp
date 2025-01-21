const express = require("express");
const errorHandle = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require("./config/dbConnection");
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandle);
app.listen(port, () => {
  console.log(`Server is running: ${port}`);
});
