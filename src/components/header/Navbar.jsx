import React, { useContext } from "react";
import "./navbar.css";
import { Box, Toolbar } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { ApiContext } from "../../context/Context";
import { useState } from "react";
import { useEffect } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const{cartState:{cart}}=useContext(ApiContext);
  console.log(cart);
  const[cartLength,setCartLength]=useState();

  useEffect(()=>{
    setCartLength(cart.reduce((acc, currVal) => acc + currVal.qty, 0));
  },[cart])
  return (
    <>
      <Toolbar className="toolbar" style={{position:"fixed",width:"100%",zIndex:1}}>
        <Link to="/">
          <Box>
            <h3 className="logo">Shopsy</h3>
          </Box>
        </Link>
        <Box className="searchContainer">
          <SearchBar className="searchbar"/>
        </Box>

        <Box>
          <Link to="/cart">
            <IconButton aria-label="cart" >
              <StyledBadge badgeContent={cartLength} color="secondary">
                <ShoppingCartIcon className="cartIcon"/>
              </StyledBadge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </>
  );
};

export default Navbar;
