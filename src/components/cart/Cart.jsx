import {
  Box,
  Button,
  ListItemButton,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

const Cart = () => {
  const {
    cartState: { cart },
    cartDispatch,
  } = useContext(ApiContext);

  const [total, setTotal] = useState();
  const [cartLength, setCartLength] = useState();
  useEffect(() => {
    setTotal(
      cart
        .reduce((acc, currVal) => acc + Number(currVal.price) * currVal.qty, 0)
        .toFixed(2)
    );
    setCartLength(cart.reduce((acc, currVal) => acc + currVal.qty, 0));
  }, [cart]);
  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="cartNav">
            <Link to="/">
              <Box className="cartnavtext">
                <ArrowBackIcon /> Continue Shopping
              </Box>
            </Link>
            <Box>
          <Link to="/cart">
            <IconButton aria-label="cart" >
              <StyledBadge badgeContent={cartLength} color="secondary">
                <ShoppingCartIcon className="cartIcon"/>
              </StyledBadge>
            </IconButton>
          </Link>
        </Box>
          </div>
          <div className="cartContainer">
            
            {cart.map((curElem) => {
              return (

                <List
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                  }}
                  key={curElem.id}
                  className="cartSection"
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          src={curElem.image}
                          alt=""
                          className="cartItemImg"
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={curElem.title} />
                    <ListItemText secondary={`$${curElem.price}`} />
                    <ListItemText
                      secondary={
                        <Rating
                          readOnly
                          value={curElem.rating.rate}
                          style={{ fontSize: 15 }}
                        />
                      }
                    />
                    <ListItemButton
                      style={{ width: 50 }}
                      onClick={() => {
                        cartDispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: curElem.id,
                            qty: curElem.qty - 1,
                          },
                        });
                      }}
                    >
                      -
                    </ListItemButton>
                    <TextField
                      disabled={curElem.qty > 20}
                      value={curElem.qty}
                      onChange={(e) => {
                        cartDispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: curElem.id,
                            qty: e.target.value,
                          },
                        });
                      }}
                      className="cartQty"
                    />
                    <ListItemButton
                      onClick={() => {
                        cartDispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: curElem.id,
                            qty: curElem.qty + 1,
                          },
                        });
                      }}
                    >
                      +
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        cartDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: curElem,
                        });
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            })}
          </div>
          <div className="grandTotal">
            <Button>Total:</Button>
            <h4>${total}</h4>
            <Button>Checkout</Button>
          </div>
        </>
      ) : (
        <div className="emptycart">
          <h3>Your cart is Empty</h3>
          <img
            src="public/assets/shopping-cart-icon-29082.png"
            style={{ width: "auto", maxHeight: 450 }}
          />
          <div className="homebtn">
            <Link to="/">
              <Button variant="contained">
                <ArrowBackIcon /> Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
