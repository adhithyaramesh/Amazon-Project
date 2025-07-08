import { styled } from "@mui/material/styles";
import { Box, Button, Card, Typography } from "@mui/material";

export const Cardtypos = styled(Typography)({
  fontSize: "13px",
});

export const CardtyposRight = styled(Typography)({
  fontSize: "13px",
  color: "#007185",
});

export const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  color: "black",
  backgroundColor: "#ffa41c",
  borderRadius: 18,
  boxShadow: "none",
  textTransform: "none",
  '&:hover': {
    boxShadow: "none"
  }
}));

export const ProductImageContainer = styled(Box)(({ theme }) => ({
  border: theme.breakpoints.down('md') ? "none" : "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "5px",
  width: { xs: "100%", md: 300, lg: 430 },
  height: { xs: 300, md: 300, lg: 530 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  overflow: { xs: "visible", md: "hidden" },
  position: "relative",
  flexShrink: 0,
  margin: { xs: "0 auto", md: 0 },
  maxWidth: { xs: 400, md: "none" }
}));

export const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  left: theme.breakpoints.down(375) ? "10px" : theme.breakpoints.down(430) ? "10px" : "-20px",
  backgroundColor: "#CC0C39",
  color: "#fff",
  width: theme.breakpoints.down(375) ? "36px" : theme.breakpoints.down(430) ? "40px" : "50px",
  height: theme.breakpoints.down(375) ? "36px" : theme.breakpoints.down(430) ? "40px" : "50px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  fontSize: theme.breakpoints.down(375) ? "9px" : theme.breakpoints.down(430) ? "10px" : "12px",
  fontWeight: "bold",
  zIndex: 1,
}));

export const ProductInfoContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.breakpoints.down('md') ? 0 : "90px",
  width: { xs: "100%", sm: 400, md: 500, lg: 490 },
  order: { xs: 2, md: 1 },
  mt: { xs: 2, md: 0 },
}));

export const BuyingCard = styled(Card)(({ theme }) => ({
  borderRadius: 2,
  padding: theme.breakpoints.down('sm') ? "15px" : "20px",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  textDecoration: "none",
  boxShadow: "none",
  border: '1px solid gainsboro',
  width: { xs: "100%", md: 235 },
  order: { xs: 1, md: 2 },
  mb: { xs: 2, md: 0 }
}));

export const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? "14px" : "18px",
  fontWeight: 600,
  mt: 2
}));

export const PropertyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 1,
  '& .property-name': {
    width: theme.breakpoints.down('sm') ? "100px" : "120px",
    fontSize: theme.breakpoints.down('sm') ? "12px" : "14px",
    fontWeight: "bolder",
    paddingBottom: "8px"
  },
  '& .property-value': {
    flex: 1,
    fontSize: theme.breakpoints.down('sm') ? "12px" : "14px"
  }
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.breakpoints.down('sm') ? "10px" : { xs: "18px", md: "8px 18px" },
  maxWidth: 1440,
  margin: "0 auto"
}));

export const BackButtonText = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? "10px" : "12px", 
  color: "gray", 
  cursor: "pointer"
}));

export const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? "14px" : { xs: "16px", md: "19px" }
}));