import { Avatar, IconButton, Menu, useMediaQuery } from "@mui/material";
import { MouseEvent, useState } from "react";
import { CloseSessionButton } from "./CloseSessionButton";

export const UserMenu = () => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            {
                isMobile
                    ? <CloseSessionButton />
                    : <>
                        <IconButton onClick={handleClick}>
                            <Avatar alt="User" aria-describedby={id} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            sx={{ boxShadow: "none" }}
                            slotProps={{
                                paper: {
                                    elevation: 1,
                                    style: {
                                        maxHeight: 45 * 4.5,
                                        width: '20ch',
                                    },
                                },
                            }}
                        >
                            <CloseSessionButton />
                        </Menu>
                    </>
            }
        </>
    );
}