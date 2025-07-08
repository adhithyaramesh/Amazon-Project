import { Box, Card, styled, Typography } from "@mui/material";

export const CTypography = styled(Typography)({
    fontSize: '22px',
    fontWeight: 550,
    padding: '30px 0px',
    textAlign: 'center',
})

export const CategoriesGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: '100%',
    boxSizing: 'border-box',
    gridTemplateColumns: 'repeat(6, 1fr)',

    [theme.breakpoints.down('1204')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    }
}));

export const CategoryCard = styled(Card)(({ theme }) => ({
    width: '98%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    cursor: 'pointer',
    boxShadow: "rgba(63, 11, 11, 0.2) 0px 2px 8px 0px",
    height: 210, // Default height for larger screens

    [theme.breakpoints.down('sm')]: {
        height: 150, // Mobile height
    },
}))

export const CBox = styled(Box)({
    width: '95%',
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export const CategoryTypography = styled(Typography)({
    marginTop: 1,
    textAlign: 'center',
    width: '100%',
    padding: '0 8px',
    paddingTop:5,
    paddingBottom:10,
    fontSize: 13,
})
