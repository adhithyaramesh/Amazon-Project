import { Box, Card, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetRequest } from "/src/api/config";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Shared/Header";
import NavBar from "../../Shared/NavBar";
import { Footer } from "../../Shared/Footer";
import { CTypography,CategoriesGrid,CategoryCard,CBox,CategoryTypography } from "../../../Styles/Category";


export const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategory, setmainCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("id");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // max-width: 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetRequest(`/category/${categoryId}`);
        setSubCategories(response.subCategories);
        setmainCategory(response.name);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    if (categoryId) {
      fetchData();
    } else {
      alert("Missing category ID in URL");
    }
  }, [categoryId]);

  const handleSubCategoryClick = (id) => {
    navigate(`/product?id=${id}`);
  };

  return (
    <>
      <Header />
      <NavBar />

      <Box align="center">
        <CTypography >
          {mainCategory}
        </CTypography>
      </Box>

      <CategoriesGrid>
        {subCategories.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CategoryCard
              onClick={() => handleSubCategoryClick(item.id)}
            >
              <CBox>
                <img
                  src={item.product[0]?.productImages[0]?.productImagePath}
                  alt={item.name}
                  style={{ 
                    maxHeight: "100%", 
                    maxWidth: "100%", 
                    objectFit: "contain" 
                  }}
                />
              </CBox>
            </CategoryCard>
            <CategoryTypography>
              {item.name}
            </CategoryTypography>
          </Box>
        ))}
      </CategoriesGrid>
      <Footer />
    </>
  );
};