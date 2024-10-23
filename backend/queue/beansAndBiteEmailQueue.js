const { Worker, tryCatch } = require("bullmq");
const express = require("express");
const app = express();
const { connection } = require("../config/queue");
const { transporter, renderTemplate } = require("../config/nodeMailer");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const beansAndBiteEmailWorker = new Worker(
  "beansAndBite-email-queue",
  async (job) => {
    console.log(job);
    const { from, to, requestFor, subject, data } = job.data;

    if (requestFor === "confirmOrder") {
      try {
        let htmlTemplate = renderTemplate(
          { orderDetails: data },
          "/orderConfirm.ejs"
        );
        const mailOptions = {
          from: process.env.SMTP_AUTH_USER,
          to,
          subject,
          html: htmlTemplate,
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              reject(error);
            } else {
              console.log(info.response);
              let retries = 3;
              const delay = 1000;
              const removeJobWithRetry = async () => {
                try {
                  await job.remove();
                  console.log("Job successfully removed");
                } catch (err) {
                  if (retries > 0) {
                    retries--;
                    console.log(
                      `Retrying job removal... (${3 - retries}/3 attempts)`
                    );
                    setTimeout(removeJobWithRetry, delay);
                  } else {
                    console.error("Failed to remove job after 3 attempts", err);
                  }
                }
              };
              await removeJobWithRetry();
              resolve(info.response);
            }
          });
        });
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
    }
  },
  {
    connection,
    limiter: {
      max: 100,
      duration: 24 * 60 * 60 * 1000,
    },
  }
);

module.exports = beansAndBiteEmailWorker;

module.exports = beansAndBiteEmailWorker;
