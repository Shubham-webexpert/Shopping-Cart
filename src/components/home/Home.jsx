import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ApiContext } from "../../context/Context";
import Navbar from "../header/Navbar";
import CarouselComponent from "./CarouselComponent";
import SingleProduct from "./SingleProduct";



const Home = () => {
  const {state:{post},cartState:{searchQuery}}= useContext(ApiContext);
  // console.log(post);

  const searchProducts=()=>{
    let sortedProducts=post;
    if(searchQuery){
      sortedProducts=sortedProducts.filter((curProd)=>{
        (curProd.title).includes(searchQuery.toLowerCase() || searchQuery.toUpperCase());
      });
      console.log(searchQuery);
    }
    return sortedProducts;
  }
  return (
    <>
      <Navbar/>
      <Box className="carousel">
        <CarouselComponent/>
      </Box>
      <div className="home">
      {
        searchProducts().map(prod=>{
          return(
            <SingleProduct prod={prod} key={prod.id}/>
          )
        })
      }
      </div>
    </>
  );
};

export default Home;
