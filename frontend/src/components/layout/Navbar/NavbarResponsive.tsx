import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMemo, useState } from 'react';
import { containsAny } from "@utils/containsAny";
import { useLocation, useNavigate, useParams } from 'react-router';
import { useUserStore } from '@store/user.store';
import { Typography } from '@mui/material';
import { UserMenu } from './UserMenu/UserMenu';
import { useModalStore } from '@store/modal.store';

export default function NavbarResponsive() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const isUserLogged = useUserStore(state => state.isLogged)();
    const getDashboardUrl = useUserStore(state => state.getUserDashboardURL);

    // Funciones para verificar rutas
    const isRoute = (route: string) => pathname === route;
    const isAnyRoute = (routes: string[]) => routes.includes(pathname);

    // Lógica para mostrar enlaces
    const shouldRenderNavLinks = useMemo(
        () => isAnyRoute(["/", "/medicos-disponibles"]),
        [pathname]
    );

    const showUserMenu = useMemo(
        () => containsAny(pathname, ["/paciente/", "/medico/", "/admin/"]),
        [pathname]
    );

    const userDashboard = getDashboardUrl();

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const setModalData = useModalStore((state) => state.setModalData);

    const handleClickLogin = () => {
        setModalData({
            title: "Iniciar Sesión",
            operation: "login",
            showModal: true,
        });
    };

    const handleClickSignUp = () => {
        setModalData({
            title: "Registrarse",
            operation: "sign_up",
            showModal: true,
        })
    };

    const handleNavigate = (route: string) => {
        handleClose();
        navigate(route);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
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
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {!isUserLogged && shouldRenderNavLinks && (
                    <>
                        <MenuItem onClick={handleClickLogin}>
                            <Typography fontWeight="bold" textTransform="none">Iniciar Sesión</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClickSignUp}>
                            <Typography fontWeight="bold">Registrarse</Typography>
                        </MenuItem>
                    </>
                )}

                {isRoute("/medicos-disponibles") && (
                    <MenuItem onClick={() => handleNavigate("/")}>
                        <Typography fontWeight="bold">Inicio</Typography>
                    </MenuItem>
                )}

                {isAnyRoute(["/", `/medico/${id}`]) && (
                    <MenuItem onClick={() => handleNavigate("/medicos-disponibles")}>
                        <Typography fontWeight="bold">Médicos Disponibles</Typography>
                    </MenuItem>
                )}

                {isUserLogged && !showUserMenu && (
                    <MenuItem onClick={() => handleNavigate(userDashboard)}>
                        <Typography fontWeight="bold" textTransform="none">Dashboard</Typography>
                    </MenuItem>
                )}

                {showUserMenu && <UserMenu />}
            </Menu>
        </div>
    );
}
