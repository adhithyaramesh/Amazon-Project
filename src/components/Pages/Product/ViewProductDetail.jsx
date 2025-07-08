import { Box, Button, Card, Divider, Rating, Typography, styled, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductImage } from "../../../Constants/constantImages";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PaymentModal from "../../Shared/PaymentModal";
import { useLocation } from "react-router-dom";
import { GetRequest } from "/src/api/config";
import Header from "../../Shared/Header";
import NavBar from "../../Shared/NavBar";
import { SignInPrompt } from "../../Shared/SignInPrompt";
import { Footer } from "../../Shared/Footer";
import { ProductSpecification } from "./ProductSpecification";
import { getCookies } from "../../../Utils/cookies";

const Cardtypos = styled(Typography)({
    fontSize: "13px",
});
const CardtyposRight = styled(Typography)({
    fontSize: "13px",
    color: "#007185",
});
const CustomButton = styled(Button)(({ theme }) => ({
    fontSize: "12px",
    color: "black",
    backgroundColor: "#ffa41c",
    borderRadius: 18,
    boxShadow: "none",
    textTransform: "none",
    // [theme.breakpoints.down("md")]: {
    //     width: 250,
    //     display: "flex",
    //     justifyContent: "center",
    // },
    '&:hover': {
        boxShadow: "none"
    }
}));

export const ViewProductDetail = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const isLoggedIn = !!getCookies('login'); // returns true if user is logged in
    const location = useLocation();
    const productId = new URLSearchParams(location.search).get("id");

    // Responsive breakpoints
    const isLargeScreen = useMediaQuery('(min-width:1200px)');
    const isMediumScreen = useMediaQuery('(max-width:900px)');
    const isSmallMobile = useMediaQuery('(max-width:430px)');
    const MobileM = useMediaQuery('(max-width:375px)');
    // const isSmallMobile = useMediaQuery('(max-width:420px)');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetRequest(`/product/${productId}`);
                setProducts([response] || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProducts([]);
            }
        };

        if (productId) {
            fetchData();
        } else {
            alert("Missing product ID in URL");
        }
    }, [productId]);

    return (
        <>
            <Header />
            <NavBar />
            <Box sx={{
                padding: isSmallMobile ? "10px" : { xs: "18px", md: "8px 18px" },
                maxWidth: 1440,
                margin: "0 auto"
            }}>
                <Box sx={{ marginBottom: "20px" }}>
                    <Typography sx={{ fontSize: isSmallMobile ? "10px" : "12px", color: "gray", cursor: "pointer" }}>
                        {"< Back to results"}
                    </Typography>
                </Box>

                {products.map((item, i) => (
                    <Box key={item.id || i} sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "center", md: "flex-start" }
                    }}>
                        {/* Product Image */}
                        <Box sx={{
                            border: isMediumScreen ? "none" : "1px solid rgba(0, 0, 0, 0.12)",
                            borderRadius: "5px",
                            width: isSmallMobile ? "100%" : { md: isLargeScreen ? 320 : 300 },
                            height: isSmallMobile ? 300 : { md: isLargeScreen ? 390 : 300 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            overflow: { xs: "visible", md: "hidden" },
                            position: "relative",
                            flexShrink: 0,
                            margin: { xs: "0 auto", md: 0 },
                            maxWidth: { xs: isSmallMobile ? "100%" : 400, md: "none" }
                        }}>
                            {isMediumScreen && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        left: MobileM ? "10px" : isSmallMobile ? "10px" : "-20px",
                                        backgroundColor: "#CC0C39",
                                        color: "#fff",
                                        width: MobileM ? "36px" : isSmallMobile ? "40px" : "50px",
                                        height: MobileM ? "36px" : isSmallMobile ? "40px" : "50px",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        fontSize: MobileM ? "9px" : isSmallMobile ? "10px" : "12px",
                                        fontWeight: "bold",
                                        zIndex: 1,

                                    }}
                                >
                                    {typeof item.discount === "number" ? `${item.discount}% off` : "0% off"}
                                </Box>
                            )}
                            <img
                                src={item.productImages?.length > 0 && item.productImages[0].productImagePath}
                                alt="Product"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    cursor: "zoom-in"
                                }}
                            />
                        </Box>

                        {/* Product Info */}
                        <Box sx={{
                            marginLeft: isMediumScreen ? 0 : "10px",
                            width: isSmallMobile ? "100%" : isLargeScreen ? 490 : isMediumScreen ? 500 : 400,
                            order: { xs: 2, md: 1 },
                            mt: { xs: 2, md: 0 },
                        }}>
                            <Typography variant="h5" sx={{ fontSize: isSmallMobile ? "14px" : { xs: "16px", md: "19px" } }}>
                                {item.name}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Typography sx={{ fontSize: isSmallMobile ? "12px" : "14px", mr: "4px" }}>
                                    {item.overallRatings === 0 ? "0" : `${item.overallRatings}`}
                                </Typography>
                                <Rating
                                    name="read-only"
                                    value={item.overallRatings}
                                    precision={0.5}
                                    readOnly
                                    sx={{ color: "orange" }}
                                    size={isSmallMobile ? "small" : isMediumScreen ? "small" : "medium"}
                                />
                                <KeyboardArrowDownIcon fontSize={isSmallMobile ? "small" : isMediumScreen ? "small" : "medium"} />
                                <Typography sx={{
                                    color: "#007185",
                                    fontSize: isSmallMobile ? "10px" : "14px",
                                    ml: isSmallMobile ? "10px" : "20px"
                                }}>
                                    {item.overallRatings === 0 ? "No Rating" : `${item.noOfRatings} Ratings`} | Search in this page
                                </Typography>
                            </Box>

                            <Typography sx={{ fontSize: isSmallMobile ? "11px" : "13px" }}>{item.bought} people in past month</Typography>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{
                                    fontSize: isSmallMobile ? "16px" : { xs: "20px", md: "24px" },
                                    color: "#CC0C39"
                                }}>
                                    -{item.discount}%
                                </Typography>
                                <Typography variant="h6" sx={{
                                    fontSize: isSmallMobile ? "18px" : { xs: "24px", md: "28px" },
                                    ml: "8px"
                                }}>
                                    <Box component="sup" sx={{ fontSize: "0.6em", verticalAlign: "super" }}>₹</Box>
                                    {item.discountedPrice}
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    textDecoration: "line-through",
                                    padding: "0 5px",
                                    fontSize: isSmallMobile ? "10px" : "12px",
                                    color: "#565959"
                                }}
                            >
                                M.R.P : ₹{item.actualPrice}
                            </Typography>

                            <Divider />
                            {isMediumScreen && (
                                <Card
                                    id="buyingCard"
                                    sx={{
                                        borderRadius: 2,
                                        padding: isSmallMobile ? "15px" : "20px",
                                        display: "flex",
                                        gap: "10px",
                                        flexDirection: "column",
                                        textDecoration: "none",
                                        boxShadow: "none",
                                        mt: 2
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <LocationOnIcon fontSize={isSmallMobile ? "small" : "medium"} />
                                        <Typography sx={{ fontSize: isSmallMobile ? "10px" : "12px", color: "#007185" }}>
                                            Deliver to - sign in to update location
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize:
                                                item.quantity === 0 || item.quantity === 2 || item.quantity === 3
                                                    ? isSmallMobile ? "12px" : "14px"
                                                    : isSmallMobile ? "16px" : "20px",
                                            fontWeight:
                                                item.quantity === 0 || item.quantity === 2 || item.quantity === 3
                                                    ? "bolder"
                                                    : "lighter",
                                            color:
                                                item.quantity === 0 || item.quantity === 2 || item.quantity === 3
                                                    ? "#CC0C39"
                                                    : "#007600",
                                        }}
                                    >
                                        {item.quantity === 0
                                            ? "Out of Stock"
                                            : item.quantity === 2 || item.quantity === 3
                                                ? `Only ${item.quantity} left in Stock`
                                                : "In stock"}
                                    </Typography>

                                    {item.quantity !== 0 && (
                                        <>
                                            <CustomButton
                                                sx={{
                                                    backgroundColor: "#FCDD3D",
                                                    fontSize: isSmallMobile ? "10px" : "12px"
                                                }}
                                                fullWidth
                                            >
                                                Add to Cart
                                            </CustomButton>

                                            <CustomButton
                                                variant="contained"
                                                onClick={() => setModalOpen(true)}
                                                sx={{ fontSize: isSmallMobile ? "10px" : "12px" }}
                                                fullWidth
                                            >
                                                Buy Now
                                            </CustomButton>
                                            <PaymentModal
                                                open={modalOpen}
                                                handleClose={() => setModalOpen(false)}
                                            />
                                        </>
                                    )}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Payment</Cardtypos>
                                            <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Ships from</Cardtypos>
                                            <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Sold by</Cardtypos>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                            <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Secure Transaction</CardtyposRight>
                                            <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Amazon</CardtyposRight>
                                            <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>{item.sellerUser?.seller.storeName}</CardtyposRight>
                                        </Box>
                                    </Box>
                                </Card>
                            )}
                            <Divider />

                            {/* delivery details */}
                            <Box sx={{ display: "flex", justifyContent: "center", py: isSmallMobile ? 2 : 3.5 }}>
                                <img src={ProductImage} alt="" style={{ height: isSmallMobile ? 30 : isMediumScreen ? 40 : 50 }} />
                            </Box>
                            <Divider />

                            <Typography sx={{ fontSize: isSmallMobile ? "16px" : '18px', fontWeight: 600, mt: 2 }}>General Details</Typography>

                            <Box sx={{ width: "100%", marginTop: 2 }}>
                                {(showAll ? item.propertyValues : item.propertyValues.slice(0, 4)).map((prop, index) => (
                                    <Box key={prop.id || index} sx={{ display: "flex", gap: 1 }}>
                                        <Typography sx={{
                                            width: isSmallMobile ? "100px" : "120px",
                                            fontSize: isSmallMobile ? "12px" : "14px",
                                            fontWeight: "bolder",
                                            paddingBottom: "8px"
                                        }}>
                                            {prop.name}
                                        </Typography>
                                        <Typography sx={{ flex: 1, fontSize: isSmallMobile ? "12px" : "14px" }}>{prop.value}</Typography>
                                    </Box>
                                ))}

                                {item.propertyValues.length > 4 && (
                                    <Box
                                        onClick={() => setShowAll(!showAll)}
                                        sx={{
                                            color: "#007185",
                                            fontSize: "10px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {showAll ?
                                            <KeyboardArrowUpIcon fontSize={isSmallMobile ? "small" : "medium"} /> :
                                            <KeyboardArrowDownIcon fontSize={isSmallMobile ? "small" : "medium"} />}
                                        <Typography sx={{ fontSize: isSmallMobile ? "10px" : "12px" }}>
                                            {showAll ? "Show Less" : "Show More"}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <hr />
                            {item.about && (
                                <Box sx={{ marginTop: "20px" }}>
                                    <Typography sx={{ fontSize: isSmallMobile ? "16px" : '18px', fontWeight: 600 }}>
                                        About this Product
                                    </Typography>
                                    <Box
                                        sx={{
                                            fontSize: isSmallMobile ? "14px" : '16px',
                                            lineHeight: 1.5,
                                            fontFamily: "Rubik"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: item.about }}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Buy Section */}
                        {!isMediumScreen && (
                            <>
                                <Box sx={{
                                    width: { xs: "100%", md: 235 },
                                    order: { xs: 1, md: 2 },
                                    mb: { xs: 2, md: 0 }
                                }}>

                                    <Card
                                        id="buyingCard"
                                        sx={{
                                            borderRadius: 2,
                                            padding: isSmallMobile ? "15px" : "20px",
                                            display: "flex",
                                            gap: "10px",
                                            flexDirection: "column",
                                            textDecoration: "none",
                                            boxShadow: "none",
                                            border: '1px solid gainsboro'
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LocationOnIcon fontSize={isSmallMobile ? "small" : isMediumScreen ? "small" : "medium"} />
                                            <Typography sx={{ fontSize: isSmallMobile ? "10px" : "12px", color: "#007185" }}>
                                                Deliver to - sign in to update location
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize:
                                                    item.quantity === 0 || item.quantity === 2 || item.quantity === 3
                                                        ? isSmallMobile ? "12px" : "14px"
                                                        : isSmallMobile ? "16px" : "20px",
                                                fontWeight: item.quantity > 3 ? "bold" : "bolder",
                                                color:
                                                    item.quantity === 0 || item.quantity === 2 || item.quantity === 3
                                                        ? "#CC0C39"
                                                        : "#007600",
                                            }}
                                        >
                                            {item.quantity === 0
                                                ? "Out of Stock"
                                                : item.quantity === 2 || item.quantity === 3
                                                    ? `Only ${item.quantity} left in Stock`
                                                    : "In stock"}
                                        </Typography>


                                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Payment</Cardtypos>
                                                <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Ships from</Cardtypos>
                                                <Cardtypos sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Sold by</Cardtypos>
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                                <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Secure Transaction</CardtyposRight>
                                                <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>Amazon</CardtyposRight>
                                                <CardtyposRight sx={{ fontSize: isSmallMobile ? "10px" : "13px" }}>{item.sellerUser?.seller.storeName}</CardtyposRight>
                                            </Box>
                                        </Box>


                                        {item.quantity !== 0 && (
                                            <>
                                                {isMediumScreen && (


                                                    <CustomButton
                                                        sx={{ backgroundColor: "#FCDD3D", }}

                                                    // fullWidth
                                                    >
                                                        Add to Cart
                                                    </CustomButton>
                                                )}

                                                <CustomButton
                                                    variant="contained"
                                                    onClick={() => setModalOpen(true)}
                                                    sx={{ fontSize: isSmallMobile ? "10px" : "12px" }}
                                                    fullWidth
                                                >
                                                    Buy Now
                                                </CustomButton>
                                                <PaymentModal
                                                    open={modalOpen}
                                                    handleClose={() => setModalOpen(false)}
                                                />
                                            </>
                                        )}
                                    </Card>
                                </Box>
                            </>
                        )}
                    </Box>
                ))}

            </Box>

            {/* Product Specification */}
            {products.length > 0 && Array.isArray(products[0]?.description) && (
                <Box
                    sx={{
                        maxWidth: { xs: '100%', md: 720, lg: 1440 },
                        margin: "0 auto",
                        textAlign: { xs: "center", md: "left" },
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: isSmallMobile ? "0 10px" : { xs: 1, md: 2 }
                    }}
                >
                    <ProductSpecification description={products[0]?.description} />
                </Box>
            )}

            {!isLoggedIn && <SignInPrompt />}
            <Footer />
        </>
    );
};