import {
  Box,
  Button,
  Card,
  Rating,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PostRequest } from "/src/api/config";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaymentModal from "../../Shared/PaymentModal";
import Header from "../../Shared/Header";
import NavBar from "../../Shared/NavBar";
import { Footer } from "../../Shared/Footer";
import { SignInPrompt } from "../../Shared/SignInPrompt";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getCookies } from "../../../Utils/cookies";
import {
  LineTypography, SaveBox, FilterButton, StyledFlexContainer, Pcard, ImgBox,
  RBox, DBox, RatingTypography, RatingBox, RTypography,
  MBox, SBox, BBox, OutButton, BuyButton
} from "../../../Styles/Product";



export const Product = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const subCategoryId = new URLSearchParams(location.search).get("id");

  const navigate = useNavigate();

  //for signIn prompt
  const isLoggedIn = !!getCookies('login'); // returns true if user is logged in

  const isMobile = useMediaQuery("(max-width:900px)");
  const laptop = useMediaQuery("(min-width:900px)");
  const isExtraSmall = useMediaQuery("(max-width:450px)");
  const isSmallest = useMediaQuery("(max-width:375px)");
  const isVerySmall = useMediaQuery("(max-width:449px) and (min-width:375px)");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          productFilters: [],
          filters: [
            { field: "overallRatings", value: 0, type: "ge" },
            { field: "subCategoryId", value: `${subCategoryId}`, type: "eq" },
          ],
          sorting: [{ column: "createdAt", order: "desc" }],
        };
        const response = await PostRequest("/getProducts", payload);
        setProducts(response.rows || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      }
    };

    if (subCategoryId) {
      fetchData();
    } else {
      alert("Missing product ID in URL");
    }
  }, [subCategoryId]);

  function handClick(id) {
    navigate(`/viewproductdetails?id=${id}`);
  }

  return (
    <div>
      <Header />
      <NavBar />


      <Box sx={{
        padding: isMobile ? 1 : 2.5,
        overflowX: "hidden"
      }}>

        {isMobile ? (
          <>

            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <FilterButton
                  variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  FILTERS (0)
                </FilterButton>
              </Box>
            )}

            <Box id="result" sx={{ display: "none" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 19 }}>Result</Typography>
              <Typography sx={{ fontSize: 14, marginTop: -1 }}>
                Check each product page for other buying options.
              </Typography>
            </Box>
          </>
        ) : (
          <Box id="result" sx={{ mb: 2, }}>
            <Typography sx={{ fontWeight: 700, fontSize: 19 }}>Result</Typography>
            <Typography sx={{ fontSize: 14, marginTop: -1 }}>
              Check each product page for other buying options.
            </Typography>
          </Box>

        )}
        <StyledFlexContainer>
          {products.map((item, i) => (
            <Pcard
              key={i}
              sx={{
                height:
                  item.quantity === 2 || item.quantity === 3
                    ? (laptop ? "280px" : "auto")
                    : (laptop ? "250px" : "auto")
              }}
            >
              {/* image section */}
              <ImgBox
                sx={{
                  width:
                    isSmallest
                      ? "120px"
                      : isVerySmall
                        ? "130px"
                        : isMobile
                          ? "180px"
                          : "235px",
                  height:
                    isSmallest
                      ? "120px"
                      : isVerySmall
                        ? "130px"
                        : isMobile
                          ? "180px"
                          : "180px",
                }}
              >
                <img
                  src={`${item.fileBaseUrl}${item.productImages?.[0]?.productImagePath}.replace("http://api-ecommerce-app.bluetickcoders.com", "/api")`}
                  height={
                    isSmallest
                      ? 120
                      : isVerySmall
                        ? 130
                        : isMobile
                          ? 180
                          : 180
                  }
                  width={
                    isSmallest
                      ? 120
                      : isVerySmall
                        ? 130
                        : isMobile
                          ? 180
                          : 232
                  }
                  style={{
                    objectFit: "contain",
                    cursor: "pointer",
                    paddingLeft: isSmallest || isVerySmall ? "0px" : "10px",
                    marginLeft: isSmallest ? "-8px" : isVerySmall ? "-4px" : "0px",
                  }}
                  onClick={() => handClick(item.id)}
                  alt={item.name}
                />
              </ImgBox>

              {/* right content section */}
              <RBox
                sx={{
                  gap: isExtraSmall ? 0.5 : 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    cursor: "pointer",
                    fontSize: isExtraSmall ? "14px" : "16px",
                    '&:hover': { color: "orange" },
                  }}
                  onClick={() => handClick(item.id)}
                >
                  {isExtraSmall && item.name.length > 50
                    ? `${item.name.slice(0, 50)}...`
                    : item.name}
                </Typography>


                {/* rating */}
                {isSmallest ? (
                  <>
                    <DBox>
                      <Rating
                        name="read-only"
                        value={item.overallRatings}
                        precision={0.5}
                        readOnly
                        sx={{ fontSize: 20 }}
                      />
                      <RatingTypography
                        sx={{
                          fontSize: isSmallest ? 12 : isVerySmall ? 12 : 15,
                          maxWidth: isSmallest ? 90 : isVerySmall ? 100 : 120,
                        }}
                      >
                        <KeyboardArrowDownIcon fontSize="small" />
                        {item.overallRatings === 0
                          ? "No rating"
                          : `${item.noOfRatings} ratings`}
                      </RatingTypography>

                    </DBox>
                  </>
                ) : (
                  <>
                    <RatingBox>
                      <Rating
                        name="read-only"
                        value={item.overallRatings}
                        precision={0.5}
                        readOnly

                        sx={{
                          fontSize: 24, '& .MuiRating-iconFilled': {
                            color: '#faaf00',
                          },
                        }}
                      />
                      <RTypography
                        sx={{
                          fontSize: isSmallest ? 11 : isVerySmall ? 12 : 15,
                          maxWidth: isSmallest ? 90 : isVerySmall ? 100 : 120,
                        }}>
                        <KeyboardArrowDownIcon fontSize="small" />
                        {item.overallRatings === 0
                          ? "No rating"
                          : `${item.noOfRatings} ratings`}
                      </RTypography>
                    </RatingBox>
                  </>
                )}


                <Typography sx={{ fontSize: 13, color: "gray" }}>
                  {item.bought} people bought in past
                </Typography>

                <MBox>
                  <Typography sx={{ fontSize: "28px", fontWeight: 500 }}>
                    <Box component="sup" sx={{ fontSize: '14px', position: 'relative' }}>
                      ₹
                    </Box>
                    {item.discountedPrice}
                  </Typography>

                  <Typography sx={{ color: "gray", fontSize: "14px" }}>M.R.P</Typography>
                  <LineTypography>{item.actualPrice} </LineTypography>
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    ({item.discount}% off)
                  </Typography>
                </MBox>

                <SBox>
                  <SaveBox>
                    Save ₹ {Math.floor(item.actualPrice - item.discountedPrice)}
                  </SaveBox>
                  <Typography sx={{ fontSize: 14 }}>with this offer</Typography>
                </SBox>

                {item.quantity === 3 || item.quantity === 2 ? (
                  <Typography sx={{ color: "red", fontSize: "14px", padding: 0.5 }}>
                    Only {item.quantity} left in stock
                  </Typography>
                ) : (
                  <></>
                )}

                {/* Button section */}
                <BBox>
                  {item.quantity === 0 ? (
                    <OutButton
                      variant="contained"
                    >
                      Out of stock
                    </OutButton>
                  ) : (
                    <>
                      <BuyButton
                        variant="contained"
                        onClick={() => setModalOpen(true)}
                      >
                        Buy Now
                      </BuyButton>
                      <PaymentModal
                        open={modalOpen}
                        handleClose={() => setModalOpen(false)}
                      />
                    </>
                  )}
                </BBox>
              </RBox>
            </Pcard>
          ))}
        </StyledFlexContainer>
      </Box>
      {!isLoggedIn && <SignInPrompt />}
      <Footer />
    </div>
  );
};