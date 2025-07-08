import { Box, Button, Card, styled, Typography } from "@mui/material";

export const LineTypography = styled(Typography)({
  fontSize: "14px",
  color: "grey",
  textDecoration: "line-through",
})

export const SaveBox = styled(Box)({
  backgroundColor: "#7fda89",
  padding: 3,
  borderRadius: 3,
  fontSize: 14,
})

export const FilterButton = styled(Button)({
  display: "flex",
  width: "98px",
  height: "26px",
  minWidth: "unset",
  padding: "2px 6px",
  fontSize: "10px",
  color: "#007b8f",
  borderColor: "gray",
  textTransform: "none",
  lineHeight: 1.2,
})

export const StyledFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.down(375)]: {
    marginLeft: -8,
    gap: "-10px",
  },

  "@media (max-width:900px)": {
    marginLeft: -30,
  },
  "@media (max-width:450px)": {
    marginLeft: "-10px",
  },
}));

export const Pcard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: 2,
  marginBottom: 1.5,
  padding: 1,
  paddingBottom: 9,
  width: "100%",
  maxWidth: "1120px",
  marginRight: "auto",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 2px 6px",

  "@media (max-width: 900px)": {
    marginTop: 5,
  },
  "@media (max-width: 600px)": {
    flexDirection: "row",
    gap: 1,
  },
})

export const ImgBox = styled(Box)({
  backgroundColor: "#f7f7f7",
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexShrink: 0,
})

export const RBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
})

export const DBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "#007185",
  cursor: "pointer",
})

export const RatingTypography = styled(Typography)({
  display: "flex",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

export const RatingBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "#007185",
  cursor: "pointer",
})

export const RTypography = styled(Typography)({
  display: "flex",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

export const MBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: "8px",
})

export const SBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  flexWrap: "wrap",
})

export const BBox = styled(Box)({
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
  marginTop: 1
})

export const OutButton = styled(Button)({
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  textTransform: "none",
  borderRadius: 20,
  width: 120,
  height: 35,
  boxShadow: "none",
  marginTop:5
})

export const BuyButton = styled(Button)({
  backgroundColor: "#ffa41c",
  color: "black",
  textTransform: "none",
  borderRadius: 20,
  width: 120,
  height: 35,
  boxShadow: "none",
})
