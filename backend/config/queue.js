const { Queue } = require("bullmq");
const connection = {
  host: process.env.VALKEY_HOST,
  port: process.env.VALKEY_PORT,
  username: process.env.VALKEY_USERNAME,
  password: process.env.VALKEY_PASSWORD,
  tls: {},
  retryStrategy: (times) => {
    const delay = Math.min(times * 1000, 5000);
    return delay;
  },
};
const beansAndBiteEmailQueue = new Queue("beansAndBite-email-queue", {
  connection: connection,
});

module.exports = { beansAndBiteEmailQueue, connection };
