import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  InputBase,
  Select,
  MenuItem,
  styled,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  tooltipClasses,
  Link,
  Autocomplete,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { HeaderLogo } from "../../Constants/constantImages";
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { Landing } from "../Pages/Product/Landing";
import { SignBox } from "../../Styles/SignInPrompt";
import { Product } from "../Pages/Product/Product";
import { useNavigate } from "react-router-dom";
import { GetRequest,FetchApi } from "/src/api/config"
import SearchContainer from "./SearchContainer";
import { getCookies, removeCookies } from "../../Utils/cookies";



const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#131921",
  color: "white",
  padding: "10px 20px",
  boxSizing: "border-box",
}));

const DeliveryInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#232F3E",
  padding: "15px 20px",
  color: "white",
  "& svg": {
    color: "white",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    marginBottom: "10px",
  },
}));

const SearchContainerPlace = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "40px",
  backgroundColor: "white",
  borderRadius: "3px",
  overflow: "hidden",
  flex: 1,
  marginLeft: "-35px",
  marginRight: "15px",
  maxWidth: "800px",
  transition: "none", // Prevent any size changes
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: "10px 0",
    "& .MuiSelect-select": {
      display: "none",
    },
  },
}));

const CategorySelect = styled(Select)({
  width: "60px",
  height: "100%",
  backgroundColor: "#f3f3f3",
  borderRight: "1px solid #ccc",
  fontSize: "13px",
  "& .MuiSelect-select": {
    padding: "8px 10px",
  },
});

const SearchInput = styled(InputBase)({
  flex: 1,
  padding: "0 10px",
  fontSize: "14px",
});

const SearchButton = styled(IconButton)({
  width: "55px",
  backgroundColor: "#febd69",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#f3a847",
  },
});

const AccountBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: "#fff",
  fontSize: "16px",
  marginRight: "18px",
  padding: "5px 10px",
  borderRadius: "3px",
  position: "relative",
  border: "2px solid transparent",
  "&:hover": {
    border: "2px solid white",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const AccountDropdown = styled(Box)({
  position: "absolute",
  top: "100%",
  right: 0,
  backgroundColor: "white",
  color: "black",
  width: "150px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  zIndex: 1000,
  "& a": {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "black",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
});

const FlagBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
  color: "#fff",
  cursor: "pointer",
  padding: "7px 8px",
  borderRadius: "6px",
  position: "relative",
  border: "2px solid transparent",
  [theme.breakpoints.down(1200)]: {
    display: "none",
  },
  "&:hover": {
    border: "2px solid white",
    "& > div": {
      display: "block",
    }
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const LanguageDropdown = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  backgroundColor: "white",
  color: "black",
  width: "200px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  zIndex: 1000,
  "& a": {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "black",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
});

const LocationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#fff",
  cursor: "pointer",
  marginRight: "30px",
  marginLeft:"-14px",
  padding: "5px 19px",
  borderRadius: "3px",
  "& svg": {
    color: "white",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const LogoImg = styled("img")({
  height: "44px",
  width:"118px",
  marginLeft: 4.5,
  cursor: "pointer",
});

const LangLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  '&:hover': {
    color: 'orange',
    textDecoration: "Underline"
  }
})

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [dropDown, setDropdown] = useState([]);
  const [searchDrop, setSearchDrop] = useState([]);
  const [userName, setUserName] = useState('');   //cookies 
  const [subCategories, setSubCategories] = useState([]); // State for subcategories


  const [drawerOpen, setDrawerOpen] = useState(false);   //menu  bar opening functionalit
  const toggleDrawer = (open) => () => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  //for signInprompt component
  const isLoggedIn = !!getCookies('login'); // returns true if user is logged in

  const navigate = useNavigate();

  useEffect(() => {

    // Fetch subcategories when component mounts
    const fetchSubCategories = async () => {
      try {
        const response = await GetRequest('/getCategoriesWithSub');
        if (response && response.length > 0) {
          // Get all subcategories from all categories
          const allSubs = response.flatMap(cat =>
            cat.subCategories
              ? cat.subCategories.map(sub => ({
                ...sub,
                categoryId: cat.id,
                categoryName: cat.name
              }))
              : []
          );
          // Sort alphabetically and take first 12
          const first12Subs = allSubs
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 12);
          setSubCategories(first12Subs);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubCategories();

    //cookies
    const nameFromCookie = getCookies('login'); // use the same key used in `setCookies('login', name)`
    if (nameFromCookie) {
      setUserName(nameFromCookie);
    }
  }, []);


  //mobile account click handling
  const handleAccountClick = () => {
    if (userName) {
      removeCookies('token');
      removeCookies('login');
      setUserName("");
      navigate('/');

    } else {
      navigate('/login');
    }
  };


  const languages = [
    { name: "English", code: "EN" },
    { name: "हिन्दी", code: "HI" },
    { name: "தமிழ்", code: "TA" },
    { name: "తెలుగు", code: "TE" },
    { name: "ಕನ್ನಡ", code: "KN" },
    { name: "മലയാളം", code: "ML" },
    { name: "বাংলা", code: "BN" },
    { name: "मराठी", code: "MR" },
  ];

  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/product?id=${subCategoryId}`);
    setDrawerOpen(false);
  };

  // mobile drawer
  const drawerList = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{bgcolor: "#232F3E"}}>
            <Typography sx={{color:"white",fontWeight:"bolder",display:"flex", justifyContent:"end",paddingRight:3, paddingTop:2}}>Your Account</Typography>
        <Box sx={{ height: 60, display: "flex", flexDirection: "column", justifyContent: "end", paddingLeft: 2, paddingBottom:2 }}>
          <Typography sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}>Browse</Typography>
          <Typography sx={{ color: "white", fontWeight: "bolder", fontSize: "22px" }}>Amazon</Typography>

        </Box>
      </Box>
      <List>
        <ListItem button onClick={() => navigate('/')} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ padding: 1, fontWeight: "bolder" }}>Amazon Home</Typography>
          <HomeOutlinedIcon sx={{ fontSize: 30 }} />
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", cursor: "pointer" }}>
          <Typography sx={{ paddingBottom: 1.5, fontWeight: "bolder" }}>Shop by Categories</Typography>
          {subCategories.map((sub) => (
            <ListItemText
              key={sub.id}
              button
              onClick={() => handleSubCategoryClick(sub.id)}
            >
              <ListItemText primary={sub.name} />
            </ListItemText>
          ))}
          <ListItem sx={{ paddingLeft: 0, paddingTop: 0.5 }} button onClick={() => navigate('/categories')}>
            <ListItemText primary="see All Categories" />
          </ListItem>
        </ListItem>
      </List>
    </Box>
  );

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .${tooltipClasses.tooltip} {
      background-color: white;
      color: #fff;
      width:100%;
      position: relative;
      top:-15px;
      font-size: 14px;
      padding: 10px;
      border-radius: 0px;
      box-shadow:0px 0px 7px 0px grey;
      }
      & .${tooltipClasses.arrow} {
          color: white;
    }
  `;

  return (
    <>
      <HeaderContainer>
        {/* Top Row */}
        <Row sx={{ height: "45px" }}>
          <Box display="flex" alignItems="center" sx={{ marginLeft: -1 }}>
            {isMobile && (
              <>
                <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                  {drawerList}
                </Drawer>
              </>
            )}

            <LogoImg src={HeaderLogo} alt="Ecommerce Logo"
              onClick={() => navigate('/')}
            />
          </Box>
          {/* mobile screen login */}
          {isMobile ? (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                onClick={handleAccountClick}
                sx={{ cursor: "pointer", textDecoration: "none", fontSize: "14px", alignContent: "end", fontWeight: 600 }}
              >
                {userName ? (<>Hello, <br /> {userName}</>) : (<>Hello, <br /> sign in</>)}
              </Typography>
              <ShoppingCartIcon />
            </Box>
          ) : (
            <>
              <LocationBox>
                <LocationOnIcon sx={{ marginRight: "5px" }} />
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption" sx={{ color: "white" }}>
                    Deliver to
                  </Typography>
                  <Typography sx={{fontSize:"14px"}}>Update location</Typography>
                </Box>
              </LocationBox>


              {/* search container */}
              <SearchContainerPlace >
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <SearchContainer />
                </Box>
              </SearchContainerPlace>


              {/* language tooltip */}
              <Tooltip
                sx={{ mr: "68px", cursor: "pointer" }}
                title={
                  <Box sx={{ p: 1 }}>
                    {languages.map((language) => (
                      <Typography
                        key={language.code}
                        variant="body2"
                        sx={{ p: 0.5, cursor: "pointer" }}
                      >
                        <LangLink>{language.name} - {language.code}</LangLink>
                      </Typography>
                    ))}
                  </Box>
                }
                arrow
                placement="bottom"
                componentsProps={{
                  tooltip: {
                    sx: {
                      position: 'relative',
                      bottom: '15px',
                      backgroundColor: '#fff',
                      marginLeft: 2,
                      color: '#000',
                      borderRadius: 0,
                      boxShadow: 2,
                      fontSize: '13px',
                      "& .MuiTooltip-arrow": {
                        color: "#fff",
                      },
                    },
                  },
                  arrow: {
                    color: 'white',
                  },
                }}
              >
                <Box>
                  <FlagBox>
                    <img
                      src="https://flagcdn.com/w40/in.png"
                      alt="flag"
                      style={{ width: "22px", marginRight: "7px" }}
                    />
                    <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>EN</Typography>
                    <ArrowDropDownIcon fontSize="small" />
                  </FlagBox>
                </Box>
              </Tooltip>

              {/* Accounts and list */}

              <Tooltip
                sx={{ cursor: "pointer" }}
                title={
                  <Box sx={{ p: 1 }}>
                    {!userName ? (
                      <LangLink onClick={() => navigate('/login')}>
                        Sign In
                      </LangLink>
                    ) : (
                      <LangLink
                        onClick={() => {
                          removeCookies('login');
                          removeCookies('token');
                          setUserName("");
                          navigate('/');
                        }}
                      >
                        Sign Out
                      </LangLink>
                    )}
                  </Box>
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
                        color: "#fff",
                      },
                    },
                  },
                  arrow: {
                    color: 'white',
                  },
                }}
              >
                <AccountBox>
                  <Typography variant="caption" >
                    Hello, {userName || "signIn"}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Accounts & Lists
                    </Typography>
                    <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </AccountBox>
              </Tooltip>


              {isSmallScreen && <ShoppingCartIcon sx={{ marginLeft: "10px" }} />}
            </>
          )}
        </Row>

        {/* Second Row (Search bar only on mobile) */}
        {isMobile && (
          <SearchContainer>
            <SearchInput placeholder="Search Amazon.in" fullWidth />
            <SearchButton>
              <SearchIcon sx={{ color: "black" }} />
            </SearchButton>
          </SearchContainer>
        )}
      </HeaderContainer>

      {/* Third Row (Delivery info only on small screens) */}
      {isSmallScreen && (
        <DeliveryInfo>
          <LocationOnIcon sx={{ marginRight: "10px" }} />
          <Typography sx={{ fontSize: 14 }}>Deliver to - Update location</Typography>
        </DeliveryInfo>
      )}
    </>
  );
};

export default Header;