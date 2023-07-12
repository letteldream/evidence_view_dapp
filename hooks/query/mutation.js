/* eslint-disable import/named */
import { useMutation } from '@tanstack/react-query';
import { useSelectWeb3 } from '../useSelectWeb3';
import { nftsContractAddress } from '../../contract';


const zero_address = '0x0000000000000000000000000000000000000000'

// 1, contract_address,token_id, 1, 1, amount, yield, duration, expiration, user_address, zero_address, random_number

// makeRequest((uint8,address,uint256,uint256,address,uint256,uint256,uint32,uint40,address,address,uint256))


export const useMutationMakeLoanRequest = () => {
  const { account, APP_CONTRACT } = useSelectWeb3();
  console.log({APP_CONTRACT})

  const mutationFn = async (details) => {
    const functionPara = { first: 1, nftsContractAddress,tokenId:details?.selectedNfts?.tokenId, third: 1, fourth: 1, amount: details?.amount, yield: details?.loadYield, duration: details?.loanDuration, expiration: details?.expiration, account, zero_address, random: 329 }

    console.log({ details , functionPara})


    const tx = await APP_CONTRACT.makeRequest((1, nftsContractAddress, details?.selectedNfts?.tokenId, 1, 1,details?.amount, details?.loadYield, details?.loanDuration, details?.expiration, account, zero_address, 329));
    return tx.wait();
  };

  return useMutation(mutationFn, {
    onError: (error) => {
      console.log(error);
    },
  });
};