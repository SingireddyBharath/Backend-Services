var fallbackFlag = false;
const skuIds = [
  95432782, 93872322, 9879892, 9873212, 9823422, 9765432, 9532711, 9528171,
  9213423, 8887654, 8883332, 8765432, 8543272, 8123123, 7823421, 7772223,
  7772221, 7654321, 7542832, 7539282, 7367432, 7256712, 7109543, 7065432,
  6045321, 5875462, 5553262, 5552221, 5328732, 5327829, 5220845, 4442221,
  4321567, 3965437, 3456211, 3332221, 3271623, 2636020, 2323211, 2179231,
  1923187, 1829121, 1328974, 1029876,
];

const partNumbers = [
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


const allNumbers = [
  95432782, 93872322, 9879892, 9873212, 9823422, 9765432, 9532711, 9528171,
  9213423, 8887654, 8883332, 8765432, 8543272, 8123123, 7823421, 7772223,
  7772221, 7654321, 7542832, 7539282, 7367432, 7256712, 7109543, 7065432,
  6045321, 5875462, 5553262, 5552221, 5328732, 5327829, 5220845, 4442221,
  4321567, 3965437, 3456211, 3332221, 3271623, 2636020, 2323211, 2179231,
  1923187, 1829121, 1328974, 1029876, "ADQ74773921",
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

// added by Bharath.Singireddy@kore.com  on 05-09-2023
// input: "what is price of SE 6 S" --->  output: "SE6S"

//Search only for SKUs since asked specifically for SKU
function findSKU(userMsg) {
 //console.log("Searching for SKU")
  for (const skuId of skuIds) {
    if (userMsg.search(skuId)!==-1) 
    {
      //console.log("Returning: "+skuId);
      return skuId;
    }
  }
  if(!fallbackFlag) fallbackSearch(userMsg, 1);
  else return null;
}

//Search only for PartNumbers since asked specifically for Part
function findPartNumber(userMsg) {
  //console.log("Searching for Part")

  for (const partNum of partNumbers) {
    if (userMsg.search(partNum)!==-1) 
    {
      //console.log("Returning: "+partNum);
      return partNum;
    }
  }
  if(!fallbackFlag) fallbackSearch(userMsg, 2);
  else return null;
}

//Search only for any available Identifier (SKU or Part Number) since ID-Type not mentioned
function findMatching(userMsg) {
  //console.log("Searching for All")

  for (const matchedID of allNumbers) 
  {
    if (userMsg.search(matchedID)!==-1) 
    {
      //console.log("Returning: "+matchedID);
      return matchedID.toString();
    }
  }
  if(!fallbackFlag) return fallbackSearch(userMsg, 3);
  else return null;
}

function fallbackSearch(userMsg, mode)
{
  userMsg = userMsg.toLowerCase();
  //console.log("Entering Fallback: "+userMsg);
  userMsg = userMsg.replaceAll("you","u");
  userMsg = userMsg.replaceAll("we","v");
  userMsg = userMsg.replaceAll("on","1");
  userMsg = userMsg.replaceAll("to","2");
  userMsg = userMsg.replaceAll("tu","2");
  userMsg = userMsg.replaceAll("for","4");
  userMsg = userMsg.replaceAll("won","1");
  userMsg = userMsg.replaceAll("ate","8");
  userMsg = userMsg.replaceAll("eat","8");
  userMsg = userMsg.replaceAll("not","0");
  userMsg = userMsg.replaceAll("hero","0");
  userMsg = userMsg.replaceAll("sea","c");
  userMsg = userMsg.replaceAll("see","c");
  userMsg = userMsg.replaceAll("seal","c");
  
  userMsg = userMsg.toUpperCase();
  //console.log("Searching in "+userMsg)
  fallbackFlag = true;
  switch(mode)
  {
    case 1: return findSKU(userMsg); break;
    case 2: return findPartNumber(userMsg); break;
    case 3: return findMatching(userMsg); break;
    default: return findMatching(userMsg); break;
  }
}

function sanitizeUtterance(userMsg)
{
  userMsg = userMsg.toLowerCase();
  userMsg = userMsg.replaceAll("skew","SKU");
  userMsg = userMsg.replaceAll("ski","SKU");
  userMsg = userMsg.replaceAll("sky","SKU");
  userMsg = userMsg.replaceAll("pirt","part");
  userMsg = userMsg.replaceAll("port","part");
  userMsg = userMsg.replaceAll("purt","part");
  userMsg = userMsg.replaceAll("one","1");
  userMsg = userMsg.replaceAll("two","2");
  userMsg = userMsg.replaceAll("three","3");
  userMsg = userMsg.replaceAll("four","4");
  userMsg = userMsg.replaceAll("fore","4");
  userMsg = userMsg.replaceAll("thri","3");
  userMsg = userMsg.replaceAll("five","5");
  userMsg = userMsg.replaceAll("six","6");
  userMsg = userMsg.replaceAll("sick","6");
  userMsg = userMsg.replaceAll("sicks","6");
  userMsg = userMsg.replaceAll("seven","7");
  userMsg = userMsg.replaceAll("shaven","7");
  userMsg = userMsg.replaceAll("eight","8");
  userMsg = userMsg.replaceAll("nine","9");
  userMsg = userMsg.replaceAll("mine","9");
  userMsg = userMsg.replaceAll("double zero","00");
  userMsg = userMsg.replaceAll("double 0","00");
  userMsg = userMsg.replaceAll("doubleo","00");
  userMsg = userMsg.replaceAll("double o","00");
  userMsg = userMsg.replaceAll("zero","0");
  userMsg = userMsg.replaceAll("knot","0");
  userMsg = userMsg.replaceAll("and","n");
  userMsg = userMsg.replaceAll("an","n");
  return extractIdentifier(userMsg);
}




function extractIdentifier(userMsg)
{
  var finalMsg = userMsg.toUpperCase();
  finalMsg = finalMsg.replaceAll(/\s/g, '');
  finalMsg = finalMsg.replaceAll("-", '');
  //console.log(finalMsg)
  if(finalMsg.search("PART")!==-1  || finalMsg.search("NUMBER")!==-1) //search For Part Only
  {
    return findPartNumber(finalMsg)
  }
  else if(finalMsg.search("SKU")!==-1) //search For SKU Only
  {
    return findSKU(finalMsg);
  }
  else  //search For any matching ID
  {
    return findMatching(finalMsg);
  }
}

function generateSkuQuery(utterance)
{
    var activationObject = {
        "price":"Product Price",
        "pricing":"Product Price",
        "cost":"Product Price",
        "location":"Product Location",
        "place":"Product Location",
        "where":"Product Location",
        "stock":"Product Inventory",
        "inventory":"Product Inventory",
        "how many":"Product Inventory",
        "count":"Product Inventory",
        "quantity":"Product Inventory",
    }
    var activationKeywords = Object.keys(activationObject);
    var identifier = validateSkuQuery(utterance,2);
    if(!identifier) return utterance;
    for(i=0; i<activationKeywords.length;i++)
    {
        if(utterance.toLowerCase().search(activationKeywords[i].toLowerCase())!=-1) return (activationObject[activationKeywords[i]] + " " + identifier);
    }
    return identifier;
}

function validateSkuQuery(utterance, mode)
{
    
    if(mode===1)
    {
        if(!utterance || utterance.length===0 || utterance===null || utterance==="" | utterance===undefined) return false;
        if(sanitizeUtterance(utterance)) return true;
        else return false;
    }
    else return sanitizeUtterance(utterance);
}


module.exports = {
    validateSkuQuery,
    generateSkuQuery
}