const express = require("express");
const mongoose = require("mongoose");

const route = require("./route/route");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/", route);

mongoose
  .connect(
    "mongodb+srv://soni:AsLXfNtyawSaG16R@cluster0.prnlc4i.mongodb.net/Mydb",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected "))
  .catch((error) => console.log(error));

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
