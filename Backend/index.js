const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Transaction = require("./models/transaction.js");
const https = require("https");
const PaytmChecksum = require("paytmchecksum");
const dotenv = require('dotenv');
const port = 3000;


app.use(cors());

app.use(bodyParser.json());

dotenv.config();



mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => { console.log(" Mongo Database Connected"); })
  .catch((err) => { console.log(err); })



app.post("/payment", async (req, res) => {


  const mid = "hDRZuj78211395275096";
  const mkey = "UQ7xEaoOvg_d_XhD";
  const hostname = "securegw-stage.paytm.in";
  const website = "WEBSTAGING";

  const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

  const orderId = "ORDER_" + randomNumber;
  const custId = "CUSTID_" + randomNumber;

  const amount = req.body.amount;
  const mobileNo = req.body.mobileNo;
  const email = req.body.email;
  const firstName = req.body.name;

  try {


    const transaction = new Transaction({
      customerId: custId,
      orderId: orderId,
      name: firstName,
      amount: parseFloat(amount),
      status: "INITIATED",
    });

    await transaction.save();

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: mid,
        websiteName: website,
        orderId: orderId,
        callbackUrl: "",
        industryType: "Retail",
        txnAmount: {
          value: amount,
          currency: "INR",
        },
        userInfo: {
          custId: custId,
          mobileNo: mobileNo,
          email: email,
          firstName: firstName,
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);
    paytmParams.head = {
      channelId: "WEB",
      signature: checksum,
    };

    const postData = JSON.stringify(paytmParams);

    const options = {
      hostname: hostname,
      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": postData.length,
      },
    };

    let response = "";
    const postReq = https.request(options, function (postRes) {
      postRes.on("data", function (chunk) {
        response += chunk;
      });

      postRes.on("end", async function () {
        const data = JSON.parse(response);
        const token = data.body.txnToken;

        const config = {
          root: "",
          flow: "DEFAULT",
          data: {
            orderId: orderId,
            token: token,
            tokenType: "TXN_TOKEN",
            amount: amount,
          },
          merchant: {
            mid: mid,
            name: "Codebeat",
            logo: `https://e7.pngegg.com/pngimages/115/966/png-clipart-paytm-logo-brand-service-product-paytm-logo-blue-text.png`,
            redirect: false,
            callbackUrl: "",
          },
          payMode: {
            filter: {
              exclude: ["BALANCE"],
            },
          },
        };

        res.send(config);
      });
    });

    postReq.write(postData);

    postReq.end();

  } catch (error) {

    console.error(error);

    res.status(500).send("Internal Server Error");


  }
});


app.get("/transactions", async (req, res) => {

  try {

    const transactions = await Transaction.find();

    res.json(transactions);

  } catch (error) {

    console.error(error);

    res.status(500).send("Internal Server Error");

  }
});






app.post("/updateStatus", async (req, res) => {

  try {
    const { orderId, status } = req.body;


    const updatedTransaction = await Transaction.findOneAndUpdate({ orderId: orderId }, { $set: { status: status } });

    res.status(200).json(updatedTransaction);

  } catch (error) {

    console.error(error);

    res.status(500).send("Internal Server Error");

  }

});


app.listen(port, () => {


  console.log(`Server running at port ${port}`);


});
