import { Box, useMediaQuery } from "@mui/material";
import { NavbarStyles } from "./NavbarStyles";
import { Logo } from "../Footer/Logo";
import { NavLinksContainer } from "./NavLinksContainer";
import { lazy } from "react";

const NavbarResponsive = lazy(() => import("./NavbarResponsive"));

export const Navbar = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={NavbarStyles.nav}>
            <Logo />
            {
                isMobile
                    ? <NavbarResponsive />
                    : <NavLinksContainer />
            }
        </Box>
    );
};
