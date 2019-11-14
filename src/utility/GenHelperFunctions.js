import web3 from "web3";

const BN = web3.utils.BN;

export const toWei = val => {
  var factor = Math.pow(10, 8);
  var weiValBN = new BN(Math.round(val * factor));
  return weiValBN.toString();
};

export const fromWei = weiValue => {
  var factor = Math.pow(10, 8);
  //var valBN = new BN(weiValue / factor)
  var valBN = weiValue / factor;
  return valBN.toString();
};

export const toShortAddress = address => {
  const addressLength = address.length;
  var shortAddress = address.slice(0, 6) + "..." + address.slice(addressLength - 4, addressLength);
  return shortAddress;
};

export const computeBlocksFromDates = (fromDate, toDate) => {
  // Considering 15 Secs as block creation time
  var blocks = 0;
  if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
    return blocks;
  } else {
    var dateInMillSecs = 0;
    dateInMillSecs = Date.parse(toDate) - Date.parse(fromDate);
    blocks = Math.floor(dateInMillSecs / (1000 * 15));
  }
  return blocks > 0 ? blocks : 0;
};

export const computeDateFromBlockNumber = (currentBlockNumber, toBlockNumber) => {
  // Considering 15 Secs as block creation time
  var millSecs = (toBlockNumber - currentBlockNumber) * (1000 * 15);

  // Current blocknumber is considered as current time
  var toDate = new Date(Date.now() + 1 * millSecs);

  return toDate.toISOString().slice(0, 10);
};

export const generateRandomKey = prefix => {
  return `${prefix}_${new Date().getTime()}`;
};
