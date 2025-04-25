import { Typography } from "@mui/material";
import { useModalStore } from "@store/modal.store";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import { useUserStore } from "@store/user.store";
import { useNavigate } from "react-router";

interface Props {
    fontSize?: string
}

export const AgendarCitaButton = ({ fontSize="1.4rem"} :Props) => {
    const isLogged = useUserStore(state => state.isLogged);
    const isUserLogged = isLogged();
    const navigate = useNavigate();
    const setModalData = useModalStore((state) => state.setModalData);
    const handleOpenModal = () => {
        setModalData({
            showModal: true,
            title: "¿Querés agendar una cita?",
            operation: "menu"
        });
    }

    const handleAgendaCita = () => {
        if(isUserLogged){
            navigate("/agendar-cita");
        } else{
            handleOpenModal();
        }
    }

    return (
        <CustomButton onClick={handleAgendaCita}>
            <Typography fontFamily="Inria Sans Bold" textTransform="none" fontSize={fontSize}>
                Agenda tu cita
            </Typography>
        </CustomButton>
    );
}
