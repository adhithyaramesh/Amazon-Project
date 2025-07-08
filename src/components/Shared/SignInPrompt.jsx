import React from "react";
import { Box, Typography, Button, Link, styled } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { SignBox, SignButton } from '../../Styles/SignInPrompt'
import { useNavigate } from "react-router-dom";



export const SignInPrompt = () => {

  const navigate = useNavigate();
  return (
    <>
      <SignBox>
        <Typography variant="body2" sx={{ fontSize: "12px", paddingTop: "20px" }}>
          See personalized recommendations
        </Typography>

        {/* Sign In Button */}
        <SignButton  onClick={() => navigate("/login")} >Sign In</SignButton>

        {/* New Customer Prompt */}
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
          New customer?
          <Link  onClick={() => navigate("/register")} underline="none" sx={{ color: "#0066c0", fontSize: "12px",paddingLeft:"5px" }}>
            Start here.
          </Link>
        </Typography>
      </SignBox>
    </>

  );
};