import axios from "axios";

export const conciseAddress = (address, startSlice = 6, endSlice = 3) => {

  if (address) {
    return `${address.slice(0, startSlice)}...${address.slice(
      address.length - endSlice,
      address.length
    )}`;

  }

  return '';

};


export const conciseString = (address, startSlice = 16, endSlice = 0) => {

  if (address) {
    return `${address.slice(0, startSlice)}...${address.slice(
      address.length - endSlice,
      address.length
    )}`;

  }

  return '';

};


export const getWalletBalance = async (chainId, account) => {
  if (chainId && account) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_ID
      },
    };

    const data = await fetch(`https://deep-index.moralis.io/api/v2/wallets/balances?chain=${chainId}&wallet_addresses%5B0%5D=${account}`, options)
      .then(response => response.json())
    return data
  }
  return null
};

export function getText(html) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}


export const handleCountWords = (inputValue) => {
  let totalWords = 0;
  const string = inputValue;
  const words = string?.split(' ');
  for (let i = 0; i < words?.length; i++) {
    if (words[i]?.trim()?.length > 0) {
      totalWords++;
    }
  }
  return totalWords;
}


export default function createObjectsArray(numberOfObjects) {
  const objectsArray = Array.from({ length: numberOfObjects }, (_, index) => (index
  ));

  return objectsArray;
}



export const getImageUri = async (tokenUri) => {

  let getTokenId = tokenUri.split('/');
  getTokenId = getTokenId?.[2]

  const getNftsDetails = await axios.get(`https://ipfs.io/ipfs/${getTokenId}`)
  return getNftsDetails.data;
}