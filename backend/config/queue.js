const { Queue } = require("bullmq");
const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};
const beansAndBiteEmailQueue = new Queue("beansAndBite-email-queue", {
  connection: connection,
});

module.exports = { beansAndBiteEmailQueue, connection };
