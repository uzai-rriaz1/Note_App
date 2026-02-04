import dbConnection from "./db/dbConnection.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

dbConnection()
  .then(() => {
    app.listen(
      process.env.PORT,
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.log("db connection error"));

app.get("/", (req, res) => {
  res.send("Hello World from the Node.js backend!");
});
