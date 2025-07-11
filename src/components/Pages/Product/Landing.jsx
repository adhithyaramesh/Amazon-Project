import React, { useEffect, useState } from "react";
import { GetRequest } from "/src/api/config";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header";
import NavBar from "../../Shared/NavBar";
import { SignInPrompt } from "../../Shared/SignInPrompt";
import { Footer } from "../../Shared/Footer";
import { getCookies } from "../../../Utils/cookies";
import { styled } from "@mui/system";

// Styles
const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
}));

const StyledBannerImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const StyledGridContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 2.5),
  flex: 1,
  gridTemplateColumns: "repeat(2, 1fr)",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    marginTop: -265,
    paddingBottom: 0,
  },
  [theme.breakpoints.between("979", "1300")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.down("1124")]: {
    marginTop: -224,
  },
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
    paddingBottom: 0,
  },
  "@media (max-width: 425px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    paddingBottom: 0,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 4,
  height: "100%",
  minHeight: 160,
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("1440")]: {
    marginBottom: 10,
    // gap:"10px"
  },
  [theme.breakpoints.down("1024")]: {
    height: 190,
    marginBottom: 10,
  },
  [theme.breakpoints.down("768")]: {
    height: 190,
    marginBottom: 10,
  },
  [theme.breakpoints.down("425")]: {
    height: 200,
    marginBottom: 10,
  },
}));

const LBox = styled(Box)({
  height: "auto",
  maxHeight: 120,
  width: 120,
  overflow: "hidden",
  margin: "auto",
  borderRadius: 1,
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap:"100px",
  padding:"1px 30px 1px 20px"
});

const LCardMedia = styled(CardMedia)({
  height: "100%",
  width: "100%",
  borderRadius: 0,
  objectFit: "contain",
  cursor: "pointer",
  marginTop:"-10px"
});

// Component
export const Landing = () => {
  const [bannerImage, setBannerImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!getCookies("login");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerData = await GetRequest("/topBanners");
        const landingData = await GetRequest("/landing");

        setBannerImage(bannerData?.[0]?.bannerImagePath.replace("http://api-ecommerce-app.bluetickcoders.com", "/api"));
        setCategories(landingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id, event) => {
    navigate(`/product?id=${id}`);
  };

  return (
    <Box sx={{ backgroundColor: "#eaeded" }}>
      <Header />
      <NavBar />

      <StyledWrapper>
        {/* Banner */}
        <Box sx={{ width: "100%" }}>
          <StyledBannerImage src={bannerImage} alt="Top Banner" />
        </Box>

        {/* Categories Grid */}
        <StyledGridContainer>
          {categories.map((item, index) => {
            const firstProduct = item.product?.[0];
            const imageUrl =
              firstProduct.fileBaseUrl.replace("http://api-ecommerce-app.bluetickcoders.com", "/api") +
              firstProduct.productImages?.[0].productImagePath;

            return (
              <Box
                key={index}
                onClick={(event) => handleClick(item.id, event)}
                sx={{ width: "100%" }}
              >
                <StyledCard>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="h6" align="center" fontWeight={600}>
                      {item.name}
                    </Typography>
                  </CardContent>
                  <LBox>
                    <LCardMedia
                      component="img"
                      image={imageUrl}
                      alt={item.name}
                    />
                  </LBox>
                </StyledCard>
              </Box>
            );
          })}
        </StyledGridContainer>
      </StyledWrapper>

      {!isLoggedIn && <SignInPrompt />}

      <Footer />
    </Box>
  );
};