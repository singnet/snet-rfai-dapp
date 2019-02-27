
import web3 from 'web3'
import { Z_BUF_ERROR } from 'zlib';

const BN = web3.utils.BN
export default class HelperFunctions {

  constructor() {
      
  }

  fromWei(weiValue) {
    var factor = Math.pow(10, 8)
    //var valBN = new BN(weiValue / factor)
    var valBN = weiValue / factor
    return valBN.toString()
  }

  toWei(val) {
    var factor = Math.pow(10, 8)
    var weiValBN = new BN(Math.round(val * factor))
    return weiValBN.toString()
  }

  toShortAddress(address) {
    const addressLength = address.length;
    var shortAddress = address.slice(0,6) + "..." + address.slice(addressLength-4,addressLength)
    return shortAddress;
  }

  computeBlocksFromDates(fromDate, toDate) {

    // Considering 15 Secs as block creation time
    var blocks = 0;
    if(isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate)) ) {
      return blocks;
    }
    else {
      var dateInMillSecs = 0;
      dateInMillSecs = Date.parse(toDate) - Date.parse(fromDate); 
      blocks = Math.floor(dateInMillSecs / (1000 * 15))
    }
    return blocks>0?blocks:0;

  }
  
}