import React, { useEffect, useState } from 'react';
import { Box, Tab, Tooltip, Typography } from '@mui/material';
import { GetRequest } from '../../api/config';
import { HeaderContainer, StyledTabs, TooltipHover } from '../../Styles/NavBar';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const names = await GetRequest('/getCategoriesWithSub');
        setCategories(names);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    FetchData();
  }, []);

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };

  // NAV category -->  SubCategory 
  const handleClickCategory = (id, event) => {
    event.stopPropagation();
    navigate(`/subCategory?id=${id}`);
  };

  // tool tip list -->  Product
  const handleClick = (id, event) => {
    event.stopPropagation();
    navigate(`/product?id=${id}`);      //sub category(product list)
  };

  return (
    <HeaderContainer>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Scrollable category tabs"
        TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
      >
        {/*All category --> Sub category */}
        <Tab onClick={() => navigate("/categories")} label="All Category" />

        {categories.map((category) =>
          category.subCategories && category.subCategories.length > 0 ? (

            <Tooltip
              key={category.id}
              title={
                category.subCategories?.length > 0 ? (
                  <Box sx={{ p: 1 }}>
                    {category.subCategories.map((sub, i) => (
                      <TooltipHover
                        key={i}
                        variant="body2"
                        onClick={(event) => handleClick(sub.id, event)}
                      >
                        {sub.name}
                      </TooltipHover>
                    ))}
                  </Box>
                ) : (
                  'No subcategories'
                )
              }
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    position: 'relative',
                    bottom: '16px',
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: 0,
                    boxShadow: 2,
                    fontSize: '13px',
                    "& .MuiTooltip-arrow": {
                      color: "white"
                    }
                  },
                },
                arrow: {
                  color: 'white',
                },
              }}
            >
              <Tab
                onClick={(event) => handleClickCategory(category.id, event)}
                label={category.name}
                aria-label={category.name}
              />
            </Tooltip>
          ) : (
            <Tab
              key={category.id}
              onClick={(event) => handleClickCategory(category.id, event)}
              label={category.name}
              aria-label={category.name}
            />
          ))}
      </StyledTabs>
    </HeaderContainer>
  );
}