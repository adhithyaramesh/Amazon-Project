import { styled, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"


export const SignBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:"30px 20px 20px 20px",
    gap:"5px",
    backgroundColor:"#fff",
    borderTop: '0.5px solid rgba(0,0,0,0.2)',
    [theme.breakpoints.down(900)]: {
        display: "none",
    },
}))

export const SignButton = styled(Button)({
    backgroundColor: "#fbc02d",
    color: "black",
    textTransform: "none",
    fontWeight: 600,
    fontSize: '12px',
    borderRadius: "6px",
    padding: '0 85px',
    margin: 0.5,
    boxShadow: "none",
    border: '1px solid #ffc52f;',
    height: '30px',
    "&:hover": {
        boxShadow: "none",
    },
})