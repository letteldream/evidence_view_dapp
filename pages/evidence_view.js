import { Box } from "@mui/material";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import MintLayout from "../components/layouts/mint-layout";
import Decorative from "../public/assets/decorative-side.svg";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import Web3 from "web3";
import { DataNetWork } from "../public/dataFake/network";
import { useAccount, useProvider } from "wagmi";
import { isEmpty } from "lodash";

const EvidenceView = () => {
  const [document, setDocument] = useState({data: '', type: '', name: ''});
  const [chain, setChain] = useState("Mumbai");
  const [tokenIds, setTokenIds] = useState([]);
  const {address} = useAccount()

  const [dataDescrypt, setDataDescrypt] = useState(null);
  const [tokenIdSelected, setTokenIdSelected] = useState(null);
  const [dataNFT, setDataNFT] = useState(null);
  const URL_FPFS = "https://ipfs.io/ipfs";
  const web3Provider = useProvider({chainId: 80001})

  const contract = useMemo(() => {
    const web3 = new Web3(DataNetWork[chain].rpcUrl);
    return new web3.eth.Contract(
      DataNetWork[chain].dataOnChain.ABI,
      DataNetWork[chain].dataOnChain.ADDRESS_CONTRACT
    );
  }, [chain]);

  const decryptedFile = (ipfsCid, decryptedData) => {
    const file = new Blob([new Uint8Array(decryptedData)], { type: ipfsCid.type });
    const url = window.URL.createObjectURL(file);
    const link = window.document.createElement('a');
    link.href = url;
    if(ipfsCid.type === 'application/pdf'){
      link.setAttribute('download', `${ipfsCid.name}.pdf`);

    }else {
      link.setAttribute('download', `${ipfsCid.name}.eml`);
    }
    window.document.body.appendChild(link);
    link.click();
  }

  useEffect(() => {
    if(!address) {
      setTokenIds([])
      return
    }
    const handleMintFlow = async () => {
      const totalSupply = await contract.methods.totalSupply().call();
      for (var i = 0; i < Number(totalSupply); i++) {
        const tokenId = await contract.methods.tokenByIndex(i).call();
        const checkOnwer = await contract.methods.ownerOf(Number(tokenId)).call();
        if(checkOnwer === address){
          setTokenIds((tokenIds) => [...tokenIds, tokenId]);
        }
      }
    };

    handleMintFlow();
  }, [address]);

  useEffect(() => {
    if (tokenIdSelected) {
      const fetchData = async () => {
        const metadataNFT = await contract.methods
          .tokenURI(Number(tokenIdSelected))
          .call();
        const customIPFS = metadataNFT.substring(metadataNFT.indexOf("/") + 2);
        const result = await fetch(`${URL_FPFS}/${customIPFS}`).then((res) =>
          res.json()
        );
        setDataNFT(result);
      };
      fetchData();
    }
  }, [tokenIdSelected]);

  const onChangeDocument = (e) => {
    
    if(e.target.value === '') { return false}
    let typeDocument = 'application/pdf'
    const dataEnscrypted = e.target.value;
    const IPFS_CID = dataNFT.claim_encrypted_proof[dataEnscrypted]
    if(dataEnscrypted === 'verified_email'){
      typeDocument = "application/octet-stream"
    }

    const handleEnscrypted = IPFS_CID?.substring(
      IPFS_CID?.indexOf("/") + 2
    );
    setDocument({data: handleEnscrypted, type: typeDocument, name: dataEnscrypted});
  };

  const onChangeTokenId = (e) => {
    setTokenIdSelected(e.target.value);
  };

  const LitNode = async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    return client;
  };

  const decrypt = async (ipfsCid) => {
    const litNodeClient = await LitNode();
    if (!litNodeClient) {
      await this.connect();
    }
    const {
      chain,
      encryptedString,
      accessControlConditions,
      encryptedSymmetricKeyString,
    } = await fetch(`${URL_FPFS}/${ipfsCid.data}`).then((res) => res.json());

    const authSig = await LitJsSdk.checkAndSignAuthMessage({chain});

    const decryptedData = await LitJsSdk.decryptFromIpfs({
      authSig,
      ipfsCid: ipfsCid.data,
      litNodeClient,
    });
    decryptedFile(ipfsCid, decryptedData)
    
  };

  return (
    <>
      <Box className="lg:mx-auto font-inter bg-[#FFFFFF] relative flex items-center gap-10 w-full lg:w-1/2 p-5">
        <div className="relative h-[400px] w-[60px]">
          <Image src={Decorative} alt="decorative side" layout="fill" />
        </div>

        <div className="grow flex flex-col items-start">
          <h1 className="text-[32px] font-montserrat font-semibold mb-6">
            Evidence View
          </h1>
          <div className="w-full flex flex-col items-start gap-4 mb-6">
            <div className="w-full flex flex-col gap-2">
              <h4 className="text-[18px] font-semibold text-[#494949]">
                Token IDs You Own
              </h4>
              <select
                name="listDocument"
                onChange={(e) => onChangeTokenId(e)}
                className="bg-white border border-zinc-400 rounded-lg outline-none p-[10px] lg:p-2 text-[16px] w-full lg:w-2/3"
              >
                <option value="" className="text-[16px]">
                  Token ID
                </option>
                {tokenIds &&
                  tokenIds.length > 0 &&
                  tokenIds.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={Number(item)}
                        className="text-[16px]"
                      >
                        Token {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <p className="text-[16px] font-sans mb-2">Document to Decrypt:</p>
              <select
                name="listDocument"
                onChange={(e) => onChangeDocument(e)}
                className="bg-white border border-zinc-400 rounded-lg outline-none p-[10px] lg:p-2 text-[16px] w-full lg:w-2/3"
              >
                <option value="" className="text-[16px]">
                  Document Name
                </option>
                {dataNFT && (
                  <Fragment>
                    <option
                      value={Object.keys(dataNFT.claim_encrypted_proof)[0]}
                      className="text-[16px]"
                    >
                      Verify Email
                    </option>
                    <option
                      value={Object.keys(dataNFT.claim_encrypted_proof)[1]}
                      className="text-[16px]"
                    >
                      Authenticated Agent statement email
                    </option>
                    <option
                      value={Object.keys(dataNFT.claim_encrypted_proof)[2]}
                      className="text-[16px]"
                    >
                      Assignment of claim
                    </option>
                  </Fragment>
                )}
              </select>
            </div>

            <button
              className={`${(isEmpty(document.data) || !tokenIdSelected || !address ) ? "cursor-not-allowed" : "cursor-pointer"} px-5 py-2 border-zinc-400 [background:linear-gradient(to_right,#f6d365_0%,rgba(246,210,48,0.6)_51%,#f6d365_100%)] opacity-80 transition-all hover:opacity-100 rounded-lg`}
              onClick={() => decrypt(document)}
              disabled={(isEmpty(document.data) || !tokenIdSelected || !address)}
            >
              Decrypt
            </button>
          </div>
        </div>
      </Box>
    </>
  );
};

EvidenceView.getLayout = function getLayout(page) {
  return <MintLayout>{page}</MintLayout>;
};

export default EvidenceView;
