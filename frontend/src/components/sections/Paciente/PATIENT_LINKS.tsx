import { NavigationItemData } from "@tipos/component";
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

export const PATIENT_LINKS: NavigationItemData[] = [
    {
        icon: <HomeIcon sx={{color: "#f1f1f1"}} />,
        titulo: "Inicio",
        ariaLabel: "navegar al inicio del dashboard",
        to: "/paciente/dashboard"
    },
    {
        icon: <StickyNote2Icon sx={{color: "#f1f1f1"}}/>,
        titulo: "Datos diagnóstico",
        ariaLabel: "navegar a los diagnósticos del paciente",
        to: "/paciente/datos-diagnostico"
    },
    {
        icon: <AccessTimeIcon sx={{color: "#f1f1f1"}}/>,
        titulo: "Historial de citas",
        ariaLabel: "navegar al historial de citas del dashboard",
        to: "/paciente/historial-citas"
    },
    {
        icon: <GroupIcon sx={{color: "#f1f1f1"}}/>,
        titulo: "Médicos disponibles",
        ariaLabel: "navegar a la vista médicos disponibles",
        to: "/medicos-disponibles"
    },
];