
import web3 from 'web3'

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
  
}