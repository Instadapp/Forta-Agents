
// const Web3 = require("web3");
// import keccak256 from 'keccak256'


const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const DAI_DECIMALS = 18;
const USDC_DECIMALS = 6;
const TRANSFER_EVENT =
  "event Transfer(address indexed from, address indexed to, uint value)";
// const Provider = ethers.providers.JsonRpcProvider;


function token(name, address, decimals) {
  this.address = address;
  this.decimals = decimals;
  this.name = name;
}

var tokens = [
  new token("DAI", DAI_ADDRESS, DAI_DECIMALS),
  new token("USDC", USDC_ADDRESS, USDC_DECIMALS)
]


module.exports = {
  tokens,
  TRANSFER_EVENT,
  DAI_ADDRESS,
  DAI_DECIMALS,
  USDC_ADDRESS,
  USDC_DECIMALS
};
