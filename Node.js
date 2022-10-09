const Mailjet = require("node-mailjet");
const msg = require("../OTP.js");

let OTP = msg.print();

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "your-api-key",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "your-api-secret",
});

const request = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "OPT@me.com",
        Name: "OTP",
      },
      To: [
        {
          Email: "John@me.com",
          Name: "John",
        },
      ],
      Subject: "Your OTP",
      TextPart: "Dear XXX," + "\n" + "Your OTP is" + " " + OTP + ".",
    },
  ],
});

request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
