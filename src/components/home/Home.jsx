import React, { useContext } from "react";
import { ApiContext } from "../../context/Context";
import Navbar from "../header/Navbar";
import SingleProduct from "./SingleProduct";



const Home = () => {
  const {state:{post},dispatch}= useContext(ApiContext);
  // console.log(post);
  return (
    <>
      <Navbar />
      <div className="home">
      {
        post.map(prod=>{
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
