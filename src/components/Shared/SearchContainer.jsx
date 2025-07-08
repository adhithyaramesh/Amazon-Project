import React, { useEffect, useState } from 'react';
import {
    Box,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { GetRequest } from "/src/api/config";

const SearchContainer = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [subCategories, setSubCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // const [openSnackbar, setOpenSnackbar] = useState(false);

    const theme = useTheme();
    const smallscreen = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    // Fetch all categories in alphabetical order
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await GetRequest('/getCategoriesWithSub');
                setCategories(response);
                
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch subcategories based on selected category
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                if (selectedCategory === 'all') {

                    // Get all subcategories if "All" is selected, sorted alphabetically
                    const allSubs = categories.flatMap(cat =>

                        cat.subCategories
                            ? cat.subCategories.map(sub => ({
                                ...sub,
                                categoryId: cat.id,
                                categoryName: cat.name
                            }))
                            : []
                    ).sort((a, b) => a.name.localeCompare(b.name));
                    setSubCategories(allSubs);

                } else if (selectedCategory) {

                    // Get subcategories for specific category in search bar, sorted alphabetically 
                    const category = categories.find(cat => cat.id === selectedCategory);
                    if (category && category.subCategories) {
                        const sortedSubs = [...category.subCategories]
                            .map(sub => ({
                                ...sub,
                                categoryId: category.id,
                                categoryName: category.name
                            }))
                            .sort((a, b) => a.name.localeCompare(b.name));
                        setSubCategories(sortedSubs);
                    } else {
                        setSubCategories([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        if (categories.length > 0) {
            fetchSubCategories();
        }
    }, [selectedCategory, categories]);

    const handleSearch = () => {
        if (selectedCategory && selectedCategory !== 'all' && !searchInput) {

            // If category is selected but no search input, navigate to category page
            navigate(`/subCategory?id=${selectedCategory}`);
            return;
        }

        if (searchInput) {
            // Find the selected subcategory (case insensitive)
            const selectedSub = subCategories.find(sub =>
                sub.name.toLowerCase() === searchInput.toLowerCase()
            );

            if (selectedSub) {
                // Navigate to products page for the selected subcategory
                navigate(`/product?id=${selectedSub.id}`);
            }
        } else if (selectedCategory === 'all') {
            // If "All" is selected with no search input, navigate to all categories
            navigate('/categories');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 800,

        }}>

            {/* category dropDown */}
            {!smallscreen ? (
                <Select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSearchInput(''); // Clear search input when category changes
                    }}
                    sx={{
                        width: 100,
                        height: 40,
                        fontSize: "13px",
                        backgroundColor: '#e6e6e6',
                        borderRight: '1px solid #ccc',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                >
                    <MenuItem value="all" sx={{ fontSize: "14px" }}>All </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id} sx={{ fontSize: "13px" }}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>

            ) : (<> </>)}

            <Autocomplete
                freeSolo
                options={subCategories}
                getOptionLabel={(option) => option.name || ''}
                inputValue={searchInput}
                onInputChange={(_, newValue) => {
                    setSearchInput(newValue);

                    // When input is cleared manually, reset category to 'all'
                    if (newValue === '') {
                        setSelectedCategory('all');
                    }
                }}
                onChange={(_, newValue) => {
                    if (newValue && newValue.categoryId) {
                        setSelectedCategory(newValue.categoryId); // Set category from subcategory
                        setSearchInput(newValue.name);            // Reflect selected subcategory
                    } else if (!newValue) {

                        //cleared via X button
                        setSelectedCategory('all');
                        setSearchInput('');
                    }
                }}
                sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid black',
                    },
                }}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.id}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search Amazon.in"
                        size="small"
                        fullWidth
                        onKeyPress={handleKeyPress}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadiusright: 3,
                                height: 40,
                                backgroundColor: 'white'
                            }
                        }}
                    />
                )}
            />

            <IconButton
                onClick={handleSearch}
                sx={{
                    backgroundColor: '#febd69',
                    borderRadius: '0 5px 5px 0',
                    height: 40,
                    width: 50,
                    '&:hover': {
                        backgroundColor: '#fcdd3d'
                    }
                }}
            >
                <SearchIcon sx={{ color: 'black' }} />
            </IconButton>
        </Box>
    );
};

export default SearchContainer;