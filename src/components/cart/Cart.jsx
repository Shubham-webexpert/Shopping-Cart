import { Button, ListItemButton, Rating, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ApiContext } from "../../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const Cart = () => {
  const {
    cartState: { cart },
  } = useContext(ApiContext);
  console.log(cart);
  return (
    <>
      {cart.length > 0 ? (
        <>
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
                    <ListItemButton style={{ width: 50 }}>-</ListItemButton>
                    <TextField
                      disabled={curElem.qty > 20}
                      className="cartQty"
                    />
                    <ListItemButton>+</ListItemButton>
                    <ListItemButton>
                      <DeleteIcon style={{ color: "red" }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            })}
          </div>
          <div>
            <Button>Total:</Button>
            <Button>Checkout</Button>
          </div>
        </>
      ) : (
        <div className="emptycart">
          <h3>Your cart is Empty</h3>
          <img src="public/assets/shopping-cart-icon-29082.png"/>
        </div>
      )}
    </>
  );
};

export default Cart;
