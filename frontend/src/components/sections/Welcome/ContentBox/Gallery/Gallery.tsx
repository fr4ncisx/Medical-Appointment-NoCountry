import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Image } from "@tipos/types";
import { useState } from "react";
import { GalleryStyle } from "./GalleryStyle";
import SliderOne from "./img/ImagenSlider-1.webp";
import SliderTwo from "./img/ImagenSlider-2.webp";
import SliderThree from "./img/ImagenSlider-3.webp";
import { GalleryItem } from "./GalleryItem";

export const Gallery = () => {
  const [indexCurrent, setIndex] = useState<number>(0);
  const Images: Image[] = [
    { src: SliderOne, name: "Jorge Swong", specialty: "Endocrinólogo" },
    { src: SliderTwo, name: "Miranda Preslie", specialty: "Dermatóloga" },
    { src: SliderThree, name: "Milagros Fernandez", specialty: "Oftalmóloga" },
  ];
  const quantity: number = Images.length;

  const changeImage = (param: string) => {
    if (param === "previous") {
      setIndex(indexCurrent == 0 ? quantity - 1 : indexCurrent - 1);
    } else {
      setIndex(indexCurrent == quantity - 1 ? 0 : indexCurrent + 1);
    }
  };

  return (
    <Box key="container" sx={GalleryStyle.galleryContainer}>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          fontSize={"2.2em"}
          sx={GalleryStyle.galleryTitle}
        >
          Nuestros profesionales
        </Typography>
      </Box>
      <Box sx={GalleryStyle.galleryContImage}>
        <IconButton onClick={() => changeImage("previous")}>
          <ArrowCircleLeft sx={GalleryStyle.galleryIcon} fontSize="large" />
        </IconButton>
        <Box>
          {Images.map((image, index: number) => (
            <GalleryItem
              image={image}
              key={index}
              index={index}
              indexCurrent={indexCurrent}
            />
          ))}
        </Box>
        <IconButton onClick={() => changeImage("next")}>
          <ArrowCircleRight sx={GalleryStyle.galleryIcon} fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};
