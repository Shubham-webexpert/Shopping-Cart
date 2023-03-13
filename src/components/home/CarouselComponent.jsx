import { Box, styled } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../ImgData/CarouselData";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Image=styled('img')`
    width:100%;
    height:280px;
`;
const CarouselComponent = () => {
  return (
    <>
      <Carousel responsive={responsive}
        swipeable={false}
        draggable={false}
        // showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        slidesToSlide={1}
        customTransition="all .2"
        transitionDuration={1000}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
            bannerData.map((data) => (
              <Box key={data.id}>
                <Image src={data.url} alt="banner" />
              </Box>
            ))
            
        }
      </Carousel>

    
    </>
  );
};

export default CarouselComponent;