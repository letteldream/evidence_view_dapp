/* eslint-disable import/named */
import { useQueries, useQuery } from '@tanstack/react-query';

import { ethers } from 'ethers';
import { useSelectWeb3 } from '../useSelectWeb3';
import { queryKeys } from './queryConstants';
import axios from 'axios';
import { getImageUri } from '../../helper/utilities';


export const useQueryGetUserInfo = () => {
  const { account, chainId, APP_CONTRACT, NFTS_CONTRACT } = useSelectWeb3();
  const queryKey = [queryKeys.getSubscriptionList, account, chainId];

  const queryFn = async () => {

    const tokenOfOwnerByIndex = await NFTS_CONTRACT.tokenOfOwnerByIndex(account, 0);
    const id = tokenOfOwnerByIndex.toString();

    const tokenUri = await NFTS_CONTRACT.tokenURI(id);
    let getTokenId = tokenUri.split('/');
    getTokenId = getTokenId?.[2]

    const getNftsDetails = await axios.get(`https://ipfs.io/ipfs/${getTokenId}`)
    const userNftsDetails = getNftsDetails.data


    return userNftsDetails
  };

  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    enabled: !!account,
    // select: ,
    onError: (error) => {
      console.log(error);
    },
  });
};


// ======================================================================

export const useQueriesUserNftsDetails = (
  array = [],
) => {
  const { account, chainId, NFTS_CONTRACT } = useSelectWeb3();

  const queryFn = async (nftId) => {
    const tokenOfOwnerByIndex = await NFTS_CONTRACT.tokenOfOwnerByIndex(account, nftId);
    const id = tokenOfOwnerByIndex.toString();

    const tokenUri = await NFTS_CONTRACT.tokenURI(id);
    const userNftsDetails = await getImageUri(tokenUri)
    return { ...userNftsDetails, tokenId: Number(id) }
  };

  const queries = array?.map((nftId, idx) => ({
    queryKey: [queryKeys.userNfts, nftId],
    queryFn: () => queryFn(nftId),
    enabled: !!NFTS_CONTRACT && !!account,
  }));

  const results = useQueries({
    queries,
  });

  return results?.map((result) => result.data);
};
// ======================================================================



export const useQueryGetUserNFTs = () => {
  // // const notify = useNotify();
  const { account, NFTS_CONTRACT } = useSelectWeb3();

  const queryKey = [queryKeys.getUserNFTS, account];

  const queryFn = async () => {
    const tokenOfOwnerByIndex = await NFTS_CONTRACT.balanceOf(account);
    let numberOfNfts = tokenOfOwnerByIndex.toString();
    return Number(numberOfNfts)
  };

  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    enabled: !!account,
    onError: (error) => console.log(error),
  });
};