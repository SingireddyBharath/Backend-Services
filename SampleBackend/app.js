const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const skuObjs = [
  95432782,
  93872322,
  9879892,
  9873212,
  9823422,
  9765432,
  9532711,
  9528171,
  9213423,
  8887654,
  8883332,
  8765432,
  8543272,
  8123123,
  7823421,
  7772223,
  7772221,
  7654321,
  7542832,
  7539282,
  7367432,
  7256712,
  7109543,
  7065432,
  6045321,
  5875462,
  5553262,
  5552221,
  5328732,
  5327829,
  5220845,
  4442221,
  4321567,
  3965437,
  3456211,
  3332221,
  3271623,
  2636020,
  2323211,
  2179231,
  1923187,
  1829121,
  1328974,
  1029876,
  "ADQ74773921",
  "ABC73509901",
  "ADQ74773922",
  "50UN6955ZUF",
  "43UN6955ZUF",
  "43UP7670PUC",
  "50UQ7570PUJ",
  "OLED48C3AUA",
  "75UQ7590PUB",
  "LRYXC2606S",
  "LRSXC2306V",
  "LRSXC2306S",
  "LRMDC2306S",
  "LRFVS3006S",
  "LRSDS2706S",
  "LRMVC2306S",
  "LRFXS2503D",
  "WSGX201HNA",
  "WSEX200HNA",
  "LRFS28XBS",
  "LDPN6761T",
  "LDFN454HT",
  "LDT7808SS",
  "LDFN4542W",
  "LDPH7972D",
  "DLE7400WE",
  "WM5500HWA",
  "SDWB24S3",
  "A937KGMS",
  "DLE6100W",
  "WM3470CM",
  "WT7400CW",
  "DLG3471M",
  "WT7405CV",
  "DCD793D1",
  "A926KSM",
  "WD200CB",
  "DCD998B",
  "U9CV1C",
  "U9CS1C",
  "S90QY",
  "SPM7A",
  "SE6S",
  "S75Q",
];
app.get("/", (req, res) => {
  res.json({ success: true });
});
app.post("/extractSKU", (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  let skuFound = false;
  for (const obj of skuObjs) {
    if (userInput.includes(obj)) {
      skuFound = true;
      res.json({ sku: obj });
      break; // Exit the loop once an SKU is found
    }
  }
  if (!skuFound) {
    res.json({});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
