
import { useCallback } from 'react';

import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { useAccount, useProvider, useSigner } from 'wagmi';

import { changeAccount, changeChainId, changeContract, changeProvider, changeSigner } from '../redux/slice/web3';

import { chainEditorABI, chainEditorAddress, nftAbi, nftsContractAddress } from '../contract';
import { useNotify } from '../components/notify';

const useWalletConnector = () => {
  const dispatch = useDispatch();
  const notify = useNotify();

  const { connector, address: account } = useAccount();
  const { data: signer, isLoading } = useSigner();
  const provider = useProvider();

  const onConnect = useCallback(async () => {
    try {
      const chainId = await signer.provider._network.chainId;
      const isChainId = chainId === 10200
      if (account && isChainId) {
        // instantiate contract instance and assign to component ref variable
        const APP_CONTRACT = new ethers.Contract(chainEditorAddress, chainEditorABI, signer);
        const NFTS_CONTRACT = new ethers.Contract(nftsContractAddress, nftAbi, signer);
        // console.log({NFTS_CONTRACT})



        dispatch(changeChainId(chainId));
        dispatch(changeAccount(account));
        dispatch(changeProvider(provider));
        dispatch(changeSigner(signer));

        dispatch(
          changeContract({
            APP_CONTRACT,
            NFTS_CONTRACT,
          }),
        );
        // switchNetwork(provider);
      } else {
        notify('error', 'network is not connected');
        console.log('network is not connected ');
      }
    } catch (error) {
      notify('error', 'network is not connected to Polygon');
      console.log(error);
    }
  }, [account, dispatch, provider, signer, isLoading]);

  const onDisconnect = async () => {
    connector.onDisconnect();

    resetAll();
  };

  return {
    onConnect,
    onDisconnect,
  };
};

export default useWalletConnector;
