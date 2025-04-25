import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { IconButton } from "@mui/material";
import { CloseSideBarButtonProps } from "@ui/SideBar/CloseSideBarButton";

export const CloseResponsiveSideBarButton = ({
  sideBarSize,
  handleChangeSize,
}: CloseSideBarButtonProps) => {
  const isExpanded = sideBarSize === "fit-content";
  return (
    <IconButton
      sx={{
        marginTop: "5px",
        marginLeft: "5px",
      }}
      onClick={handleChangeSize}
    >
      {isExpanded ? (
        <ArrowDropDownIcon color={"primary"} />
      ) : (
        <ArrowDropUpIcon color={"primary"} />
      )}
    </IconButton>
  );
};
