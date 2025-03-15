import { useUserStore } from "@store/user.store";
import { UserRole } from "@tipos/store";
import { Navigate, Outlet } from "react-router";

export const PacienteGuard = () => {
    const hasRole = useUserStore(state => state.hasRole);
    const isLogged = useUserStore(state => state.isLogged);
    const isUserLogged = isLogged();
    const isPaciente = hasRole(UserRole.PACIENTE);
    return (isUserLogged && isPaciente) ? <Outlet /> : <Navigate to="/" replace />;
}