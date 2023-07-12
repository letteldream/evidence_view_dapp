import Head from "next/head";
import { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import { Box } from "@mui/material";

const IndexLayout = ({ children }) => {
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
          <Header />
          <main className="relative bg-[#F6FCFF]">{children}</main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default IndexLayout;
