import { Box, Button, Paper, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import "./home.css";
import { ApiContext } from "../../context/Context";
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'px solid #000',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',  
  p: 4,
};

const SingleProduct = ({ prod }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {cartDispatch}=useContext(ApiContext);

  return (
    <>
      <div className="card">
        <Paper className="paper">
          <Box>
            <img src={prod.image} alt={prod.title} className="cardImg" />
          </Box>
          <Box>
            <h3>{prod.title}</h3>
            <p>{prod.category}</p>
            <p>$ {prod.price}</p>
          </Box>
          <Box>
            <Button onClick={()=>{
              cartDispatch({
                type:"ADD_TO_CART",
                payload:prod
              })
            }}>Add to cart</Button>
           
            <div>
            <Button onClick={handleOpen}>View Details</Button>
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
                  <img src={prod.image} alt={prod.title} className="modalImg"/>
                </Box>
                <Box>
                  <h3>{prod.title}</h3>
                  <p>{prod.description}</p>
                  <p>{prod.category}</p>
                  <h5>${prod.price}</h5>
                  <p><Rating readOnly value={prod.rating.rate}/></p>
                  <p>{prod.rating.count} items available in stock</p>
                  <Button variant="contained" onClick={()=>{
                    cartDispatch({
                      type:"ADD_TO_CART",
                      payload:prod
                    })}}>Add to cart</Button>
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
