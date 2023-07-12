import React from "react";
import Image from "next/image";
import Logo from "../public/assets/brand/cex-logo.png";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fafafa",
        pt: 5,
        borderTop: "1px solid #edebeb"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={6} sm={3}>
            <Link
              className="relative block h-[60px] aspect-[2.63] cursor-pointer"
              href={"/"}
            >
              <Image src={Logo} alt="CEX.Claims" />
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              About
            </Typography>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                About Us
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Mission
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Privacy
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Terms
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Web App
            </Typography>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Tokenize Claim
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                View Metadata
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                View Evidence
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Request Loan
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Earn Yield
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Help
            </Typography>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                CEX.Claims Wiki
              </Typography>
            </Link>
            <Link underline="none" href="#">
              <Typography variant="h6" color="text.secondary">
                Contact
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <div className="my-6 h-[1px] bg-[#717171] w-full"></div>
        <Box mt={5} sx={{ display: { xs: "flex" }, justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© Copyright 2023. All rights reserved. "}
            <Link color="#058BE0" href="#">
              Terms and Conditions Apply
            </Link>
          </Typography>
          <Box className="w-[36px] h-[36px] relative cursor-pointer">
            <Link href="https://twitter.com/CEXclaims"><TwitterIcon fontSize="medium" /></Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
