//imports the Web3 API
import Web3 from 'web3';
import Portis from "@portis/web3";

/**
 * creates & exports new instance for
 * Web3 using provided service by Metamask.
 */
let currentWeb3;

if (window.ethereum) {
  let instance = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    // Acccounts now exposed
    currentWeb3 = instance;
  } catch (error) {
    // User denied account access...
    alert('Please allow access for the app to work');
  }
} else if (window.web3) {
  currentWeb3 = new Web3(web3.currentProvider);
  // Acccounts always exposed
} else {
  const portis = new Portis('84a6e8e1-6a24-4a81-8f2c-7b1488a4b772', 'ropsten');
  currentWeb3 = new Web3(portis.provider);
}

export default currentWeb3;