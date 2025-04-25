import { useUserStore } from "@store/user.store";
import { UserRole } from "@tipos/store";
import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import { CheckingAccessLoader } from "./CheckingAccessLoader";

interface ProtectedRouteProps {
    requiredRole: UserRole;
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const hasRole = useUserStore(state => state.hasRole);
    const isLogged = useUserStore(state => state.isLogged);
    const location = useLocation();

    const [isChecking, setIsChecking] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const userLogged = isLogged();
        const hasRequiredRole = hasRole(requiredRole);
        setIsAllowed(userLogged && hasRequiredRole);
        setIsChecking(false);
    }, [hasRole, isLogged, requiredRole]);

    if (isChecking) {
        return <CheckingAccessLoader />;
    }

    return isAllowed ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
};
