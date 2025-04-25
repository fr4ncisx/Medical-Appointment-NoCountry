import { Grid2, useMediaQuery } from "@mui/material";
import { NavigationItemData } from "@tipos/component";
import { ResponsiveSideBar } from "@ui/ResponsiveSideBar/ResponsiveSideBar";
import { SideBar } from "@ui/SideBar/SideBar";
import { ReactNode } from "react";

interface Props {
  sideBarItems: NavigationItemData[];
  children: ReactNode;
}

export const SectionWrapper = ({ sideBarItems, children }: Props) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Grid2
      container
      width="100%"
      minHeight={isMobile ? "unset" : "calc(100vh - 80px)"}
      bgcolor="#f1f1f1"
      columnSpacing={0}
    >
      {isMobile ? (
        <ResponsiveSideBar links={sideBarItems} />
      ) : (
        <SideBar links={sideBarItems} />
      )}
      <Grid2 size={{ xs: 12, md: "grow" }} padding="1.5em">
        {children}
      </Grid2>
    </Grid2>
  );
};
