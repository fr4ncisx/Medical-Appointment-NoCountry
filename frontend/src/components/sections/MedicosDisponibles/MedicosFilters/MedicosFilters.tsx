import { Grid2 } from "@mui/material";
import { SelectorEspecialidad } from "./SelectorEspecialidad";
import { BarraBusqueda } from "./BarraBusqueda";
import { FiltrosSelected } from "./FiltrosSelected";
import { GeneroRadioButton } from "./GeneroRadioButton";

export const MedicosFilters = () => {
    return (
        <Grid2 width="300px" padding="1em 1.5em" bgcolor="#fff" borderRadius="10px">
            <BarraBusqueda />
            <FiltrosSelected />
            <GeneroRadioButton />
            <SelectorEspecialidad />
        </Grid2>
    );
}