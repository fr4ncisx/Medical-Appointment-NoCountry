import { Grid2, IconButton, useMediaQuery } from "@mui/material";
import { SelectorEspecialidad } from "./SelectorEspecialidad";
import { BarraBusqueda } from "./BarraBusqueda";
import { FiltrosSelected } from "./FiltrosSelected";
import { GeneroRadioButton } from "./GeneroRadioButton";
import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const MedicosFilters = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  return (
    <>
      {isMobile && (
        <IconButton onClick={() => setOpenFilterMenu(!openFilterMenu)}>
          <FilterAltIcon color="primary"/>
        </IconButton>
      )}
      <Grid2
        size={{ xs: 12, sm: 4, md: 3 }}
        padding={isMobile && !openFilterMenu ? "0px" : "1em 1.5em"}
        bgcolor="#fff"
        borderRadius="10px"
        overflow={"hidden"}
        height={isMobile && !openFilterMenu ? "0px" : "min-content"}
      >
        <BarraBusqueda />
        <FiltrosSelected />
        <GeneroRadioButton />
        <SelectorEspecialidad />
      </Grid2>
    </>
  );
};
