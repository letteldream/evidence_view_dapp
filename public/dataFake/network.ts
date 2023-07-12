import { dataContract } from "./abi";
export const DataNetWork = {
  // ["Ethereum"]: {
  //     name: "Ethereum Mainnet",
  //     chainID: 1,
  //     symbol: "ETH",
  //     rpcUrl: "https://mainnet.infura.io/v3/",
  //     blockScan: "https://etherscan.io"
  // },
  ["Goerli"]: {
    name: "Goerli test network",
    chainID: 5,
    symbol: "GoerliETH",
    rpcUrl: "https://goerli.infura.io/v3/2907423bfdd84b7183ca5b2f04e65ea9",
    blockScan: "https://goerli.etherscan.io",
    dataOnChain: dataContract["Goerli"],
  },
  // ["Gnosis"]: {
  //     name: "Gnosis Mainnet",
  //     chainID: 100,
  //     rpcUrl: "https://rpc.gnosischain.com",
  //     symbol: "xDai",
  //     blockScan: "https://gnosisscan.io"
  // },
  ["Chiado"]: {
    name: "Chiado Testnet",
    chainID: 10200,
    rpcUrl: "https://rpc.chiadochain.net",
    symbol: "Chiado xDai",
    blockScan: "https://blockscout.com/gnosis/chiado",
    dataOnChain: dataContract["Chiado"],
  },
  ["Mumbai"]: {
    name: "Polygon Testnet",
    chainID: 80001,
    rpcUrl: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
    symbol: "MATIC",
    blockScan: "https://mumbai.polygonscan.com",
    dataOnChain: dataContract["Mumbai"],
  },
};
export const NetWorks = [
  {
    chainID: 10200,
    name: "Chiado",
  },
  {
    chainID: 5,
    name: "Goerli",
  },
  {
    chainID: 80001,
    name: "Mumbai",
  },
];

export const utf8Decode = (utf8Array) => {
  let str = '';
  let i = 0;
  while (i < utf8Array.length) {
      let charCode = utf8Array[i++];
      if (charCode < 128) {
          str += String.fromCharCode(charCode);
      }
      else if (charCode > 191 && charCode < 224) {
          str += String.fromCharCode(((charCode & 31) << 6) | (utf8Array[i++] & 63));
      }
      else if (charCode > 239 && charCode < 365) {
          charCode =
              ((charCode & 7) << 18) |
                  ((utf8Array[i++] & 63) << 12) |
                  ((utf8Array[i++] & 63) << 6) |
                  (utf8Array[i++] & 63);
          charCode -= 0x10000;
          str += String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
      }
      else {
          str += String.fromCharCode(((charCode & 15) << 12) |
              ((utf8Array[i++] & 63) << 6) |
              (utf8Array[i++] & 63));
      }
  }
  return str;
}
