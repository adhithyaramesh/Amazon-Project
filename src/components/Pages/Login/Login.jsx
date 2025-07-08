import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomBox,
  CustomButton,
  CustomContainer,
  CustomHeading,
  CustomLabel,
  CustomLink,
  CustomTextField,
  NavigateBox,
  NavigateButton,
  SellerBox,
} from "../../../Styles/Login";
import { EcommerceLoginLogo } from "../../../Constants/constantImages";
import { PostRequest } from "/src/api/config";
import { setCookies } from "../../../Utils/cookies";

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ mobileNo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({ mobileNo: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateInputs = () => {
    const phoneEmailRegex = /^(\d{10}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    const newErrors = { mobileNo: "", password: "" };
    let isValid = true;

    if (!values.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile or Email is required";
      isValid = false;
    } else if (!phoneEmailRegex.test(values.mobileNo)) {
      newErrors.mobileNo = "Please enter valid 10-digit mobile number or email";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await PostRequest("/login", values);
      if (res && res.name && res.token) {
        setCookies("login", res.name);
        setCookies("token", res.token);
        setSnackbarMessage("Login Successful");
        setSnackbarOpen(true);
        navigate("/");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "Login failed. Please try again.";
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomContainer component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={EcommerceLoginLogo} alt="logo" style={{ marginBottom: 20 }} />
          <CustomBox component="form" onSubmit={handleSubmit} noValidate>
            <CustomHeading component="h1" variant="h5">
              Sign in or create account
            </CustomHeading>

            <Box sx={{ mt: 2, width: "100%" }}>
              <CustomLabel htmlFor="mobileNo">Email or mobile number</CustomLabel>
              <CustomTextField
                id="mobileNo"
                name="mobileNo"
                fullWidth
                size="small"
                autoComplete="email"
                autoFocus
                value={values.mobileNo}
                onChange={handleChange}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
              />
            </Box>

            <Box sx={{ mt: 2, width: "100%" }}>
              <CustomLabel htmlFor="password">Password</CustomLabel>
              <CustomTextField
                id="password"
                name="password"
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Continue"
              )}
            </CustomButton>

            <SellerBox>
              <CustomLink href="#" variant="body2">
                Login in Business Account?
              </CustomLink>
              <CustomLink href="#" variant="body2">
                Go Back
              </CustomLink>
            </SellerBox>
          </CustomBox>

          <NavigateBox>
            <Divider sx={{ width: "100%" }}>New to Amazon?</Divider>
            <NavigateButton
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/register")}
            >
              Create new account
            </NavigateButton>
          </NavigateBox>
        </Box>
      </CustomContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            flexWrap: "nowrap",
          },
        }}
      />
    </>
  );
};