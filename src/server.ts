import mongoose from "mongoose";
import app from "./app";
import logger from "./common/logger";
import { DB_CONN_STRING, DB_NAME } from "./common/db/consts";

const PORT = 8080;

mongoose
  .connect(`${DB_CONN_STRING}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Express with Typescript! http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to database", err);
  });
