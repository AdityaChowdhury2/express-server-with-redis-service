import { RedisService } from "./services/redis.service";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    if (!config.db.uri) {
      throw new Error("DB_URI is not set");
    }
    await mongoose.connect(config.db.uri);
    console.log("Connected to DB");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  await RedisService.close();
  process.exit(0);
});

export default app;
