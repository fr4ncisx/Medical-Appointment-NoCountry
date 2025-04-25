import { ReactNode } from "react"
import HospitalIcon from "./icons/HospitalIcon";
import CoinIcon from "./icons/CoinIcon";
import StethoscopeIcon from "./icons/StethoscopeIcon";

export interface DetailsSection {
    subtitle: string
    body: string
    icon: ReactNode
}

export const SECTIONS: DetailsSection[]  = [
    {
        subtitle: 'Modernización clínica',
        body: 'Accede a una vasta lista de profesionales de la salud, agenda tu cita en minutos, chatea con tu médico de cabecera, nos adecuamos a tus necesidades.',
        icon: <HospitalIcon />
    },
    {
        subtitle: 'Sin comisiones',
        body: 'No cobramos comisiones por agendar una cita médica, lo único que debes abonar es la cita con el médico que se adecúe a tus necesidades.',
        icon: <CoinIcon />
    },
    {
        subtitle: 'Equipo de profesionales',
        body: 'Contamos con un equipo médico profesional que fue formado en universidades de prestigio y verificados por nuestros asistentes administrativos.',
        icon: <StethoscopeIcon />
    }
]