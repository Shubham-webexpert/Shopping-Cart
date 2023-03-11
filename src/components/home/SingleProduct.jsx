import { Box, Button, Paper, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import "./home.css";
import { ApiContext } from "../../context/Context";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "px solid #000",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  p: 4,
};

const SingleProduct = ({ prod }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    cartState: { cart },
    cartDispatch,
  } = useContext(ApiContext);

  return (
    <>
      <div className="card">
        <Paper className="paper">
          <Box>
            <img src={prod.image} alt={prod.title} className="cardImg" />
          </Box>
          <Box>
            <h3 className="cardTitle">{prod.title}</h3>
            <p className="cardCategory">{prod.category}</p>
            <p className="cardPrice">$ {prod.price}</p>
          </Box>
          <Box>
            {cart.some((curElem) => curElem.id === prod.id) ? (
              <Button
                variant="contained"
                style={{ background: "red", margin: 8 }}
                onClick={() => {
                  cartDispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  });
                }}
                sx={{ padding: "5px 10px", fontSize: 11 }}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  cartDispatch({
                    type: "ADD_TO_CART",
                    payload: prod,
                  });
                }}
                style={{ margin: 5 }}
                sx={{ padding: "5px 10px", fontSize: 11 }}
              >
                Add to cart
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{ background: "green", margin: 5 }}
              sx={{ padding: "5px 10px", fontSize: 11 }}
            >
              View Details
            </Button>

            <div>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                className="modalbox"
              >
                <Box sx={style} className="itemDetails">
                  <Box>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="modalImg"
                    />
                  </Box>
                  <Box>
                    <h3 className="cardTitle">{prod.title}</h3>
                    <p className="cardDescription">{prod.description}</p>
                    <p className="cardCategory">{prod.category}</p>
                    <h5 className="cardPrice">${prod.price}</h5>
                    <p className="cardRating">
                      <Rating readOnly value={prod.rating.rate} />
                    </p>
                    <p>{prod.rating.count} items available in stock</p>
                    {cart.some((curElem) => curElem.id === prod.id) ? (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red" }}
                        sx={{ padding: "5px 10px", fontSize: 11 }}
                        onClick={() => {
                          cartDispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          });
                        }}
                      >
                        Remove from cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ padding: "5px 10px", fontSize: 11 }}
                        onClick={() => {
                          cartDispatch({
                            type: "ADD_TO_CART",
                            payload: prod,
                          });
                        }}
                      >
                        Add to cart
                      </Button>
                    )}
                  </Box>
                </Box>
              </Modal>
            </div>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default SingleProduct;
