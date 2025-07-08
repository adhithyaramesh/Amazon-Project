import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';


const PayementField = ({ label, name, type = "text", value, onChange, show, setShow }) => {

    function getInputType() {
        if (type === 'password') {
            return show ? 'text' : 'password'
        }
        return type
    }

    return (
        <Box sx={{backgroundColor: "transparent", boxShadow: "none"}}>
            <TextField
                fullWidth
                variant='outlined'
                name={name}
                type={getInputType()}
                label={label}
                value={value}
                onChange={onChange}
                sx={{ margin: '10px 0px' }}
                InputProps={{
                    sx: {
                        '& .MuiInputBase-input': {
                            height: '40px',
                            padding: '10px', // optional: control padding inside input
                            boxSizing: 'border-box',
                            margin: '8px'
                        }
                    },
                    endAdornment: type === "password" && (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => setShow(!show)} edge='end' sx={{ color: 'black' }}>
                                {show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    )
}
export default PayementField;