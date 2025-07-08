import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    Typography,
    Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {
    CustomRBox,
    CustomButton,
    CustomContainer,
    CustomTextField,
    NavigateRBox,
    NavigateButton,
    CustomLabel,
} from "../../../Styles/Login";
import { EcommerceLoginLogo } from "../../../Constants/constantImages";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { PostRequest } from "/src/api/config";
import { setCookies } from "../../../Utils/cookies";

export const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        mobileNo: "",
        email: "",
        password: ""
    });

    const [fieldErrors, setFieldErrors] = useState({
        name: "",
        mobileNo: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {
            name: "",
            mobileNo: "",
            email: "",
            password: ""
        };

        // Local validation
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.mobileNo.trim()) {
            errors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            errors.mobileNo = "Mobile number must be exactly 10 digits";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.password.trim()) errors.password = "Password is required";

        const hasErrors = Object.values(errors).some(msg => msg !== "");
        if (hasErrors) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});

        try {
            const response = await PostRequest('/register', formData);
            // Save data in cookies
            setCookies('signup', formData);
            setSnackBarMessage('Account Created');
            setSuccess(true);
            setSnackBarOpen(true);
            navigate("/login");
        } catch (err) {
            const backendError =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                "Registration failed.";
            setSnackBarMessage(backendError);
            setSnackBarOpen(true);
        } 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleCloseSnackbar = () => {
        setSnackBarOpen(false);
        setSuccess(false);
    };

    return (
        <>
            <CustomContainer sx={{ gap: "5px" }}>
                <img src={EcommerceLoginLogo} alt="logo" />
                <CustomRBox sx={{ gap: "5px" }} component="form">
                    <Typography variant="h5">Create your account</Typography>

                    <Box>
                        <CustomLabel>Name</CustomLabel>
                        <CustomTextField
                            name="name"
                            fullWidth
                            size="small"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!fieldErrors.name}
                            helperText={fieldErrors.name}
                        />
                    </Box>

                    <Box>
                        <CustomLabel>Mobile Number</CustomLabel>
                        <CustomTextField
                            name="mobileNo"
                            fullWidth
                            size="small"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 10,
                                pattern: "[0-9]*",
                            }}
                            error={!!fieldErrors.mobileNo}
                            helperText={fieldErrors.mobileNo}
                        />
                    </Box>

                    <Box>
                        <CustomLabel>Email</CustomLabel>
                        <CustomTextField
                            name="email"
                            type="email"
                            fullWidth
                            size="small"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!fieldErrors.email}
                            helperText={fieldErrors.email}
                        />
                    </Box>

                    <Box>
                        <CustomLabel>Password</CustomLabel>
                        <CustomTextField
                            name="password"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            size="small"
                            error={!!fieldErrors.password}
                            helperText={fieldErrors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ color: "black" }}
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <CustomButton
                        type="submit"
                        disableElevation
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ marginBottom: "8px", borderRadius: "5px", marginTop: "25px" }}
                    >
                        {"Register"}
                    </CustomButton>
                </CustomRBox>

                <NavigateRBox>
                    <Divider sx={{ marginTop: "-20px" }}>Already have an account?</Divider>
                    <NavigateButton
                        variant="contained"
                        fullWidth
                        size="small"
                        disableElevation
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </NavigateButton>
                </NavigateRBox>
            </CustomContainer>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                message={snackBarMessage}
            />
        </>
    );
};
