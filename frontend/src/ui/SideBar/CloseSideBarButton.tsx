import { IconButton } from "@mui/material";
import { SideBarStyles } from "./SideBarStyles";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface CloseSideBarButtonProps {
    sideBarSize: string
    handleChangeSize: () => void
}

export const CloseSideBarButton = ({ sideBarSize, handleChangeSize }: CloseSideBarButtonProps) => {
    const isExpanded = sideBarSize === "190px";
    return (
        <IconButton sx={{
            ...SideBarStyles.button,
            justifyContent: isExpanded ? "end" : "center"
        }} onClick={handleChangeSize}>
            {
                isExpanded
                    ? <>
                        <ArrowBackIosIcon sx={SideBarStyles.closeButton} />
                        <ArrowBackIosIcon sx={SideBarStyles.closeButton} />
                        <ArrowBackIosIcon sx={SideBarStyles.closeButton} />
                    </>
                    : <ArrowForwardIosIcon sx={SideBarStyles.closeButton} />
            }
        </IconButton>
    );
}