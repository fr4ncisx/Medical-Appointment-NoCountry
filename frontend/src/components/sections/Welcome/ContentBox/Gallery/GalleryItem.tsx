import { Box, Typography } from "@mui/material";
import { GalleryStyle, imgStyle } from "./GalleryStyle";

interface Props {
  image: any;
  index: number;
  indexCurrent: number;
}

export const GalleryItem = ({ image, index, indexCurrent }: Props) => {
  return (
    <Box
      sx={{
        ...GalleryStyle.galleryImgText,
        opacity: index === indexCurrent ? 1 : 0,
        height: index === indexCurrent ? "auto" : 0,
        overflow: index === indexCurrent ? "visible" : "hidden",
      }}
    >
      <Box sx={GalleryStyle.galleryImg}>
        <img key={index} src={image.src} alt={image.name} style={imgStyle} />
      </Box>
      <Box sx={GalleryStyle.textBox}>
        <Typography
          key={image.name}
          variant="body1"
        >
          {image.name}
        </Typography>
        <Typography
          key={image.specialty}
          variant="body2"
        >
          {image.specialty}
        </Typography>
      </Box>
    </Box>
  );
};
