import { List } from "@mui/material";
import { CloseSideBarButton } from "./CloseSideBarButton";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { SideBarStyles } from "./SideBarStyles";
import { NavigationItemData } from "@tipos/component";

export interface SideBarContentProps {
  links: NavigationItemData[];
  sideBarSize: string;
  handleChangeSize: () => void;
}

export const SideBarContent = ({
  links,
  sideBarSize,
  handleChangeSize,
}: SideBarContentProps) => {
  return (
    <>
      <CloseSideBarButton
        sideBarSize={sideBarSize}
        handleChangeSize={handleChangeSize}
      />
      <List sx={SideBarStyles.list}>
        {links.map((item, index) => (
          <NavigationItem key={index} {...item} />
        ))}
      </List>
    </>
  );
};
