import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";

const CustomContainer = styled(Container)({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    margin: "0 auto"
})

const CustomBox = styled(Box)(({ theme }) => ({
    border: "1px solid #d5d9d9",
    borderRadius: "5px",
    width: "20rem",
    minHeight: "345px",
    padding: "25px 26px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    fontSize: "14px",
    [theme.breakpoints.down('md')]: {
        border: "none",
        width: "19rem",
    }
}))

const CustomRBox = styled(Box)(({ theme }) => ({
    border: "1px solid #d5d9d9",
    borderRadius: "5px",
    width: "20rem",
    minHeight: "305px",
    padding: "10px 26px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "50px",
    fontSize: "14px",
    [theme.breakpoints.down('md')]: {
        width: "90vw",
        border: "none"
    }
}))

const CustomHeading = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    [theme.breakpoints.down('md')]: {
        fontSize: "21px"
    }
}))

const CustomLabel = styled(Typography)({
    fontSize: "inherit",
    fontWeight: "500"
})

const CustomButton = styled(Button)({
    backgroundColor: "#fcdd3d",
    borderRadius: "30px",
    color: "black",
    textTransform: "capitalize",
    boxShadow: "none",
    marginTop: "8px"
})

const CustomLink = styled(Typography)({
    color: "#0066c0",
    fontSize: ".75rem",
    textAlign: "center"
})

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
        '& .MuiInputBase-input': {
            padding: "7px !important"
        },
    },
});

const NavigateBox = styled(Box)(({ theme }) => ({
    width: "23rem",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    // alignContent:"center",
    alignItems: "center", 
    gap: "1px",
    [theme.breakpoints.down('md')]: {
        width: "15rem",
    },
    display:"flex",
    justifyContent:"center"

}))

const NavigateRBox = styled(Box)(({ theme }) => ({
    width: "23rem",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    [theme.breakpoints.down('md')]: {
        width: "80vw"
    }
}))

const NavigateButton = styled(Button)({
    backgroundColor: "#e0e0e0",
    color: "black",
    boxShadow: "none",
    // textTransform: "uppercase",
    fontSize: ".7rem",
    fontWeight: "500",
    width:"320px",
   textAlign:"center",
   display:"flex",
   justifyContent:"center",
   alignItems:"center",
   alignContent:"center"
})

const SellerBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "15px"
})


export { CustomContainer, CustomBox, CustomRBox, CustomHeading, CustomLabel, CustomButton, CustomLink, CustomTextField, NavigateBox, NavigateRBox, NavigateButton, SellerBox };