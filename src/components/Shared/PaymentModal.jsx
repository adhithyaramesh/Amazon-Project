import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    TextField,
    useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const PaymentField = ({ label, value, onChange, type = "text", show, setShow }) => {
    return (
        <TextField
            fullWidth
            label={label}
            type={type === "password" && !show ? "password" : "text"}
            value={value}
            onChange={onChange}
        />
    );
};

const PaymentModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:900px)');

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? 250 : isTablet ? 400 : 450,
        height: isMobile ? 250 : isTablet ? 325 : 270,
        borderRadius: "10px",
        p: isMobile ? 2 : 4,
        textAlign: "start",
        backgroundColor: "white",
        boxShadow: "none",
        // maxHeight: '90vh',
        overflowY: 'auto'
    };

    const modalStyleNested = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? 250 : isTablet ? 400 : 450,
        borderRadius: "10px",
        p: isMobile ? 3 : 5,
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "none"
    };

    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleProceedToBuy = () => {
        if (paymentMethod === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv)) return;
        if (paymentMethod === 'upi' && !upiId) return;
        setSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalOpen(false);
        handleClose();
    };

    return (
        <>
            {!successModalOpen ? (
                <Modal
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{
                        style: {
                            background: "#1111119a",
                            backdropFilter: "blur(10px)"
                        }
                    }}
                >
                    <Box sx={modalStyle}>
                        <Typography variant='h6'>Select Payment Method</Typography>
                        <Divider sx={{ my: 1, borderBottom: "1px solid #E0E0E0" }} />

                        <FormControl>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                sx={{
                                    padding: isMobile ? "10px" : "25px",
                                    maxHeight: isTablet ? "150px" : "none",
                                    overflowY: isTablet ? "auto" : "visible"
                                }}
                            >
                                <FormControlLabel value="card" control={<Radio />} label="Debit or Credit Card" />
                                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                                <FormControlLabel value="delivery" control={<Radio />} label="Cash on Delivery" />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'upi' && (
                            <PaymentField
                                label="UPI ID"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                            />
                        )}

                        {paymentMethod === 'card' && (
                            <Stack spacing={2}>
                                <PaymentField
                                    label="Card Number*"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                                <PaymentField
                                    label="Cardholder Name*"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                                <PaymentField
                                    label="Expiry Date (MM/YY)*"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                                <PaymentField
                                    label="CVV"
                                    type="password"
                                    value={cvv}
                                    show={showPassword}
                                    setShow={setShowPassword}
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                            </Stack>
                        )}

                        <Box mt={2}>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={handleProceedToBuy}
                                sx={{
                                    bgcolor: '#fcdd3d',
                                    color: 'black',
                                    borderRadius: '20px',
                                    fontWeight: 550
                                }}
                            >
                                Proceed to Buy
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            ) : (
                <Modal open={successModalOpen} onClose={handleCloseSuccessModal}>
                    <Box sx={modalStyleNested}>
                        <CheckCircleIcon sx={{ color: "#00c853", fontSize: '6rem' }} />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant='h5'>Payment Successful!</Typography>
                            <Typography>Your payment has been processed successfully.</Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 2, bgcolor: "black", color: "white" }}
                                onClick={() => navigate('/')}
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default PaymentModal;
