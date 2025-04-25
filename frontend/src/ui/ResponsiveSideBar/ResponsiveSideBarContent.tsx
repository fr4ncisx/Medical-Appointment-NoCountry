import { List } from "@mui/material";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { SideBarContentProps } from "../SideBar/SideBarContent";
import { ResponsiveSideBarStyles } from "./ResponsiveSideBarStyles";
import { CloseResponsiveSideBarButton } from "./CloseResponsiveSideBarButton";

export const ResponsiveSideBarContent = ({
  links,
  sideBarSize,
  handleChangeSize,
}: SideBarContentProps) => {
  const listStyle =
    sideBarSize === "0px"
      ? ResponsiveSideBarStyles.listResponsiveClose
      : ResponsiveSideBarStyles.listResponsiveOpen;

  return (
    <>
      <CloseResponsiveSideBarButton
        sideBarSize={sideBarSize}
        handleChangeSize={handleChangeSize}
      />
      <List sx={{ ...listStyle, height: sideBarSize }}>
        {links.map((item, index) => (
          <NavigationItem key={index} {...item} />
        ))}
      </List>
    </>
  );
};
