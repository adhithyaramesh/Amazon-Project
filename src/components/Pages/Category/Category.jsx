import React, { useEffect, useState } from 'react';
import { FetchApi } from "/src/api/config";
import {
    Box,
    Card,
    Typography,
    useTheme,
    useMediaQuery,
    styled,
} from '@mui/material';
import Header from '../../Shared/Header';
import NavBar from '../../Shared/NavBar';
import { SignInPrompt } from '../../Shared/SignInPrompt';
import { Footer } from '../../Shared/Footer';
import { useNavigate } from 'react-router-dom';
import { getCookies } from '../../../Utils/cookies';
import { CTypography, CategoriesGrid, CategoryCard, CBox, CategoryTypography } from "../../../Styles/Category"


export const Category = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const isLoggedIn = !!getCookies('login'); // returns true if user is logged in

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // max-width: 600px
    const isTablet = useMediaQuery(theme.breakpoints.between('md')); // 600px - 900px
    const laptop = useMediaQuery(theme.breakpoints.down('1204'));
    const laptopL = useMediaQuery(theme.breakpoints.up('1204'));



    useEffect(() => {
        const categoriesFetch = async () => {
            try {
                const response = await FetchApi.get('/getCategoriesWithSub');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        categoriesFetch();
    }, []);

    const handleCategoryClick = (id) => {
        navigate(`/subCategory?id=${id}`);
    };

    return (
        <>
            <Header />
            <NavBar />
            <Box align="center">
                <CTypography>
                    Shop by Category
                </CTypography>
            </Box>

            <CategoriesGrid>
                {categories.map((category) => (
                    <Box
                        key={category.id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <CategoryCard
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <CBox>
                                <img
                                    src={category.categoryImagePath}
                                    alt={category.name}
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </CBox>
                        </CategoryCard>
                        <CategoryTypography>{category.name}</CategoryTypography>
                    </Box>
                ))}
            </CategoriesGrid>

            {!isLoggedIn && <SignInPrompt />}
            <Footer />
        </>
    );
};
