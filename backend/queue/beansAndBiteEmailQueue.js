const { Worker, tryCatch } = require("bullmq");
const express = require("express");
const app = express();
const { connection } = require("../config/queue");
const { transporter, renderTemplate } = require("../config/nodeMailer");
const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const beansAndBiteEmailWorker = new Worker(
  "beansAndBite-email-queue",
  async (job) => {
    //console.log(job.data);
    const { to, requestFor, subject, data, pdfData } = job.data;

    if (requestFor === "confirmOrder") {
      try {
        let htmlTemplate = renderTemplate(
          { orderDetails: data },
          "/orderConfirm.ejs"
        );
        let pdfEjsTemplate = renderTemplate(
          { orderDetails: pdfData },
          "/orderSummary.ejs"
        );
        const filePath = await generatePdf(pdfEjsTemplate, pdfData.orderId);
        const mailOptions = {
          from: process.env.SMTP_AUTH_USER,
          to,
          subject,
          html: htmlTemplate,
          attachments: [
            {
              filename: path.basename(filePath),
              path: filePath,
            },
          ],
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              reject(error);
            } else {
              //console.log(info.response);
              fs.unlinkSync(filePath);
              //console.log(`PDF deleted from ${filePath}`);
              let retries = 3;
              const delay = 1000;
              const removeJobWithRetry = async () => {
                try {
                  await job.remove();
                  //console.log("Job successfully removed");
                } catch (err) {
                  if (retries > 0) {
                    retries--;
                    // console.log(
                    //   `Retrying job removal... (${3 - retries}/3 attempts)`
                    // );
                    setTimeout(removeJobWithRetry, delay);
                  } else {
                    //console.error("Failed to remove job after 3 attempts", err);
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

const generatePdf = async (htmlContent, orderId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  // Save the PDF to a file
  const fileName = `Order_Details_${orderId}.pdf`;
  const filePath = path.join(__dirname, "../views", fileName);
  fs.writeFileSync(filePath, pdfBuffer);
  return filePath;
};

module.exports = beansAndBiteEmailWorker;
