header.js

import { Box, Typography, Select, InputBase, IconButton, styled, colors } from '@mui/material';

export const HeaderContainer = styled(Box)({
  width: '100%',
  height: '65px',
  backgroundColor: '#131921',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  '@media (max-width: 768px)': {
     height: '115px',
  },
});

export const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
  marginRight: '25px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '15px',
  
  '@media (max-width: 1024px)': {
    paddingLeft: '12px',
    marginRight: '0px',
  },
});

export const LocationBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px',
  cursor: 'pointer',
  color: '#fff',
  '@media (max-width: 1024px)': {
    marginRight: '23px',
  },
});

export const SearchContainer = styled(Box)({
  display: 'flex',
  height: '40px',
  borderRadius: '3px',
  overflow: 'hidden',
  backgroundColor: 'white',
});

export const CategorySelect = styled(Select)({
  minWidth:'65px',
  maxWidth:'100px',
  height: '100%',
  backgroundColor: '#f3f3f3',
  borderRadius:'0px',
  fontSize: '13px',
  '& .MuiSelect-select': {
    padding: '8px 10px',
  },
  '@media (max-width: 1024px)': {
    width: '84px', 
    fontSize: '12px',
  },
});


export const SearchInput = styled(InputBase)({
  padding: '0 10px',
  fontSize: '16.5px',
  width: '700px',
  '@media (max-width: 1024px)': {
    width: '420px',
  },
});

export const SearchButton = styled(IconButton)({
  width: '55px',
  backgroundColor: '#febd69',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#f3a847',
  },
});

export const LanguageBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '40px',
  gap: '3px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '13px',
  border: '2px solid transparent',
  padding: '5px 8px',
  borderRadius: '4px',
  '&:hover': {
    border: '2px solid white',
  },
  '@media (max-width: 1024px)': {
    display: 'none',
  },
});

export const AccountBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '65px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '5px 8px',
  border: '2px solid transparent',
  borderRadius: '4px',
  '&:hover': {
    border: '2px solid white',
  },
  '@media (max-width: 1024px)': {
    marginLeft: '5px',
  },
});

export const LangHover = styled(Box)({
  '&:hover': {
    color: 'orange',
    textDecoration:'underline',
    cursor:'pointer'
  },
});