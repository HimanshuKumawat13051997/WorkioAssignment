import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`App is listening to PORT Number ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection Failed: ", err);
  });
