import { styled } from '@mui/material/styles';
import { Box, Tabs } from '@mui/material';

export const HeaderContainer = styled(Box)(() => ({
  backgroundColor: '#232f3e',
  height:"50px",
  "@media (max-width:899px)": {
  display: "none",
}

}));

export const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTab-root': {
    color: 'white',
    fontSize: '14px',
    fontWeight: 5,
    textTransform: 'none',
    fontFamily: 'PT Sans',
    padding:'5px 10px',
    border: '2px solid transparent',
    '&.Mui-selected': {
      color: 'white',
    },
    '&:hover': {
      borderColor: 'white',
    },
  },
  '& .MuiTabs-scrollButtons': {
    color: 'white',
  },
}));

export const TooltipHover = styled(Box)({
    fontSize: '14px', 
    p: '0px 6px',
    lineHeight: 1.9, 
  '&:hover': {
    color: 'orange',
    textDecoration:'underline',
    cursor:'pointer',
    fontFamily: 'revert-layer', 
  },
});