import { SxProps } from "@mui/material";
import { ObjectStyles } from "@tipos/component";

const DisplayFlexStyles: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}

export const NavbarStyles: ObjectStyles = {
    nav: {
        backgroundColor: "#F1F1F1",
        padding: "1.5rem",
        width: "100%",
        height: "80px",
        borderBottom: "1px solid #c1c1c1",
        ...DisplayFlexStyles
    },
    items: {
        ...DisplayFlexStyles,
        gap: "1rem"
    }
};
