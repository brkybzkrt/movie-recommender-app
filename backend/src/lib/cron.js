import cron from "cron";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const job = new cron.CronJob("*/12 * * * *", () => {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Server is running");
      } else {
        console.log("Server is not running", res);
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
});


export default job;
