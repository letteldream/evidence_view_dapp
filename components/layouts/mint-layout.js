import Head from "next/head";
import { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import { Container } from "@mui/material";

const MintLayout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        {/* <link href="/styles/nft-metadata-viewer.css" rel="stylesheet" /> */}
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css"
        ></link> */}
      </Head>

      <div className="bg-[#F6FCFF] w-full h-full">
        <div className="">
          <Header
            background="[background:linear-gradient(to_bottom,#111,#111_70%,#044a3e_100%)]"
            >
            <div className="w-full mx-auto mb-4">
                <h1 className="text-[#FFFFFF] font-montserrat font-bold text-[24px] lg:text-[36px]">RWA NFT Metadata Viewer</h1>
                <h3 className="text-[#f4f4f4] font-inter font-normal text-[13px] lg:text-[15px] leading-[24px]">View all data associated with a RWA NFT, including proof.</h3>
            </div>
          </Header>
          <Container className="relative bg-[#F6FCFF] pt-[190px]">{children}</Container>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default MintLayout;
