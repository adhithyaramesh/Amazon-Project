import { styled, Box, Typography, useMediaQuery } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useEffect, useState } from "react";
import { getCookies } from "../../Utils/cookies";

// ---------- Styled Components ----------

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "#232f3e",
  color: "white",
  fontFamily: "Arial, sans-serif",
}));

const BackToTop = styled(Box)(({ theme }) => ({
  backgroundColor: "#37475a",
  textAlign: "center",
  padding: "15px 0",
  marginBottom: "30px",
  cursor:"pointer"
}));

const BackToTopLink = styled("a")(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  fontSize: "13px",
  cursor:"pointer"
}));

const ColumnsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  maxWidth: "1200px",
  margin: "auto",
  marginTop: "-15px",
  padding: theme.spacing(2),
  gap: theme.spacing(7),
}));

const Column = styled(Box)(({ theme }) => ({
  flex: "1 1 200px",
  margin: theme.spacing(0, 2, 1.5),
  minWidth: "200px",
}));

const ColumnTitle = styled("h3")(({ theme }) => ({
  fontSize: "16px",
  marginBottom: "2px",
  fontWeight: "bold",
}));

const ColumnList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 1,
  margin: 0,
}));

const ColumnItem = styled("li")(({ theme }) => ({
  fontWeight: 550,
}));

const ColumnLink = styled("a")(({ theme }) => ({
  color: "#ddd",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "2",
  "&:hover": {
    textDecoration: "underline",
    color: "white",
  },
}));

// ---------- Mobile Footer Styled Components ----------

const MobileWrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: '#232f3e',
  color: "white",
  // padding: theme.spacing(2),
  fontFamily: "Arial, sans-serif",
}));

const FullWidthTop = styled(Box)(({ theme }) => ({
  backgroundColor: "#37475a",
  textAlign: "center",
  padding: "15px 0",
  width: "100vw",
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  // padding: "7px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const MobileColumns = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: theme.spacing(2, 1),
  backgroundColor: "#232f3e",
  width: "100vw",
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  // padding: "20px 0",
}));

const MobileColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  padding: "0px 10px",
  "@media (max-width:768px)": {
    padding: '0px 50px'
  },
  "@media (max-width:470px)": {
    padding: '0px 20px'
  },
  "@media (max-width:350px)": {
    padding: '0px 10px'
  },
}));

const DividerLine = styled(Box)(({ theme }) => ({
  borderTop: "1px solid #555",
  margin: theme.spacing(2, 0, 1),
}));

const MobileText = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  paddingBottom: "10px",
}));

const GMobileText = styled(Typography)({
  color: "#999",
  fontSize: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

const FooterBottomText = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "#ccc",
  textAlign: "center",
}));

const MFBox = styled(Box)({
  backgroundColor: "#131a22",
  width: "100vw",
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
});

// ---------- Components ----------

const MobileFooter = () => {

  //cookies
  const [userName, setUserName] = useState('');

  useEffect(() => {
    
    const nameFromCookie = getCookies('login');
    if (nameFromCookie) {
      setUserName(nameFromCookie);
    }
  }, []);


  return (
    <MobileWrapper>
      <FullWidthTop>
        <ArrowDropUpIcon
          sx={{ fontSize: "12px", color: "white", cursor: "pointer" }}
        />
        <Typography sx={{ fontSize: "12px", cursor: "pointer" }}>
          TOP OF PAGE
        </Typography>
      </FullWidthTop>
      <Box sx={{}}>
        <MobileColumns>
          <MobileColumn>
             <MobileText>Amazon.in</MobileText>
            <MobileText>Your Orders</MobileText>
            <MobileText>Your Account</MobileText>
            <MobileText>Returns</MobileText>
            <MobileText>Customer Service</MobileText>
          </MobileColumn>
          <MobileColumn>
            <MobileText>{`${userName} Amazon.in`|| `${setUserName("")}Your Amazon.in`}</MobileText>
            <MobileText>Your Lists</MobileText>
            <MobileText>Your Recently Viewed Items</MobileText>
            <MobileText>Sell</MobileText>
            <MobileText>Help</MobileText>
          </MobileColumn>
        </MobileColumns>
      </Box>

      <MFBox>
        <Box sx={{ textAlign: "center", paddingTop: "20px" }}>
          <GMobileText>
            <LanguageIcon sx={{ fontSize: "16px", color: "#999" }} />
            English
          </GMobileText>
          <MobileText sx={{ mt: 1 }}>Switch Accounts</MobileText>
          <MobileText>Sign Out</MobileText>
        </Box>

        <Box sx={{ mt: 2 }}>
          <FooterBottomText sx={{ color: "#999" }}>
            Conditions of Use&nbsp;&nbsp; Privacy Notice&nbsp;&nbsp;
            Interest-Based Ads
          </FooterBottomText>
          <FooterBottomText sx={{ paddingBottom: "20px", color: "#999" }}>
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </FooterBottomText>
        </Box>
      </MFBox>
    </MobileWrapper>
  );
};

export const Footer = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  if (isMobile) return <MobileFooter />;

  return (
    <FooterContainer>
    <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <BackToTopLink as="span">Back to top</BackToTopLink>
      </BackToTop>

      <ColumnsContainer>
        <Column>
          <ColumnTitle>Get to Know Us</ColumnTitle>
          <ColumnList>
            <ColumnItem>
              <ColumnLink href="#">About Us</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Careers</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Press Releases</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Amazon Science</ColumnLink>
            </ColumnItem>
          </ColumnList>
        </Column>

        <Column>
          <ColumnTitle>Connect with Us</ColumnTitle>
          <ColumnList>
            <ColumnItem>
              <ColumnLink href="#">Facebook</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Twitter</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Instagram</ColumnLink>
            </ColumnItem>
          </ColumnList>
        </Column>

        <Column>
          <ColumnTitle>Make Money with Us</ColumnTitle>
          <ColumnList>
            <ColumnItem>
              <ColumnLink href="#">Sell on Amazon</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Sell under Amazon Accelerator</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Protect and Build Your Brand</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Amazon Global Selling</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Supply to Amazon</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Become an Affiliate</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Fulfilment by Amazon</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Advertise Your Products</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Amazon Pay on Merchants</ColumnLink>
            </ColumnItem>
          </ColumnList>
        </Column>

        <Column>
          <ColumnTitle>Let Us Help You</ColumnTitle>
          <ColumnList>
            <ColumnItem>
              <ColumnLink href="#">Your Account</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Returns Centre</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">
                Recalls and Product Safety Alerts
              </ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">100% Purchase Protection</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Amazon App Download</ColumnLink>
            </ColumnItem>
            <ColumnItem>
              <ColumnLink href="#">Help</ColumnLink>
            </ColumnItem>
          </ColumnList>
        </Column>
      </ColumnsContainer>
    </FooterContainer>
  );
};