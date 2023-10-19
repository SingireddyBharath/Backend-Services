const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post("/extractSKU", (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  let skuFound = false;
  for (const obj of skuObjs) {
    if (userInput.includes(obj.id)) {
      skuFound = true;
      res.json({ sku: obj.id });
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
