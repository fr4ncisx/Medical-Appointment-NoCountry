import { Grid2 } from "@mui/material";
import { NavigationItemData } from "@tipos/component";
import { useState } from "react";
import { ResponsiveSideBarContent } from "./ResponsiveSideBarContent";
import { ResponsiveSideBarStyles } from "./ResponsiveSideBarStyles";

export interface ResponsiveSideProps {
  links: NavigationItemData[];
}

export const ResponsiveSideBar = ({ links }: ResponsiveSideProps) => {
  const [sideBarSize, setSideBarSize] = useState<string>("0px");

  const handleChangeSize = () => {
    const size = sideBarSize === "fit-content" ? "0px" : "fit-content";
    setSideBarSize(size);
  };

  return (
    <Grid2
      width={sideBarSize}
      sx={ResponsiveSideBarStyles.sideBar}
      size={{ xs: 12 }}
    >
      <ResponsiveSideBarContent
        handleChangeSize={handleChangeSize}
        links={links}
        sideBarSize={sideBarSize}
      />
    </Grid2>
  );
};
