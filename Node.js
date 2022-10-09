const Mailjet = require("node-mailjet");
const msg = require("../OTP.js");

let OTP = msg.print();

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "0b0a22319d8e3f1de10c55ef3de92667",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "20533d7c968b40b803ee55e9e332ef19",
});

const request = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "rkapril@me.com",
        Name: "OTP",
      },
      To: [
        {
          Email: "rkapril@me.com",
          Name: "Ray Goh",
        },
      ],
      Subject: "Your OTP",
      TextPart: "Dear XXX," + "\n" + "Your OTP is" + " " + OTP,
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
