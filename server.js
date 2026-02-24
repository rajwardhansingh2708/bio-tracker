const express = require("express");
const mongoose = require("mongoose");
const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");
const axios = require("axios");

const app = express();

// 🔴 We will paste MongoDB link here later
mongoose.connect("mongodb+srv://rajws:avenger5@cluster0.m6dl51y.mongodb.net/?appName=Cluster0");

const Visit = mongoose.model("Visit", {
  ip: String,
  device: String,
  browser: String,
  os: String,
  location: String,
  time: Date
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


app.get("/", async (req, res) => {

  const parser = new UAParser(req.headers["user-agent"]);
  const ua = parser.getResult();
  const ip = requestIp.getClientIp(req);

  let location = "Unknown";

  try {
    const geo = await axios.get(`http://ip-api.com/json/${ip}`);
    location = geo.data.city + ", " + geo.data.country;
  } catch {}

  await Visit.create({
    ip,
    device: ua.device.type || "desktop",
    browser: ua.browser.name,
    os: ua.os.name,
    location,
    time: new Date()
  });

  res.send(`
    <html>
      <body style="text-align:center;margin-top:200px;font-family:Arial;">
        <h1>Welcome here...</h1>
        <h2>Stay tuned for more updates here</h2>
      </body>
    </html>
  `);
});

app.get("/mysecretvisits", async (req, res) => {
  const visits = await Visit.find().sort({ time: -1 });
  res.json(visits);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));