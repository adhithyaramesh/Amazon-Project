import { Box, Card, CardMedia, styled } from "@mui/material";

export const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
}));

export const StyledBannerImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});


export const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 4,
  height: 174,
  width: "100%",
  maxWidth: 335,
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("1440")]: {
    marginBottom: 20,
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

export const LBox = styled(Box)({
  height: 115,
  width: 115,
  overflow: "hidden",
  margin: "auto",
  borderRadius: 1,
})

export const LCardMedia = styled(CardMedia)({
  height: "100%",
  width: "100%",
  borderRadius: 0,
  objectFit: "contain",
  cursor: "pointer",
})
