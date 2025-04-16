import { MenuItem } from "@mui/material";
import { Anchor } from "@ui/Anchor/Anchor";
import { useNavigate } from "react-router";
import { useUserStore } from "@store/user.store";

export const CloseSessionButton = () => {
    const navigate = useNavigate();
    const closeSession = useUserStore((state) => state.closeSession);

    const handleCloseSession = () => {
        closeSession();
        navigate("/");
    }

    return (
        <MenuItem>
            <Anchor to="/" onClick={handleCloseSession} ariaLabel="cerrar sesion del usuario" >Cerrar Sesion</Anchor>
        </MenuItem>
    );
}