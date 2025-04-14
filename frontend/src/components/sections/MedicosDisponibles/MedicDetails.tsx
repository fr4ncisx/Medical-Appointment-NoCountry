import { Avatar, Box, Grid2, Typography } from "@mui/material";
import { getMedico } from "@services/medic/getMedico";
import { useUserStore } from "@store/user.store";
import { MedicoData } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import CustomModal from "@ui/CustomModal/CustomModal";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ModalMenu from "@components/sections/Welcome/ModalMenu/ModalMenu";
import { useModalStore } from "@store/modal.store";
import { AgendarCitaButton } from "@components/sections/Welcome/MainBox/AgendarCitaButton";
import { EspecialidadesMedicas } from "@tipos/component";

export const MedicDetails = () => {
    const id: string = useParams().id || "";
    const [medico, setMedico] = useState<MedicoData>();
    const [error, setError] = useState<CustomError>(null);
    const [loading, setLoading] = useState(false);
    const token = useUserStore(state => state.getToken)();
    const showModal = useModalStore((state) => state.modalData.showModal);

    useEffect(() => {
        getMedico({ medicoId: id, token, setMedico, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 80px)">
                <Typography color="primary" variant="h4">
                    Cargando
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 80px)">
                <Typography color="error" variant="h4">
                    {`Ocurrio un error: ${error.description}`}
                </Typography>
            </Box>
        );
    }

    if (!medico) {
        return <>No se pudo recuperar el medico</>;
    }
    const { description, speciality, lastname, name } = medico;
    const fullname = `${name} ${lastname}`;

    return (
        <Grid2 container width="100%" minHeight="calc(100vh - 80px)">
            <Grid2 padding="3.5rem 0" width="350px" bgcolor="#c1c1c1" display="flex" flexDirection="column" alignItems="center" gap="1rem">
                <Box>
                    <Avatar alt={fullname} src="/assets/img/user.svg" sx={{ margin: "auto", width: 200, height: 200, bgcolor: "#f1f1f1", border: "1px solid #f1f1f1" }} />
                </Box>
                <AgendarCitaButton fontSize="1rem" />
            </Grid2>
            <Grid2 size="grow" padding="3.5rem 0">
                <Box margin="auto" width="75%" display="flex" flexDirection="column" gap="2.5rem">
                    <Box>
                        <Typography variant="h2" sx={{ color: "#726969" }} fontSize={32} lineHeight="2rem" mb=".5rem">
                            {fullname}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            {`Especialista en ${EspecialidadesMedicas[speciality]}`}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: "#726969" }}>
                        {description}
                    </Typography>
                </Box>
            </Grid2>
            {
                showModal && (
                    <CustomModal>
                        <ModalMenu />
                    </CustomModal>
                )
            }
        </Grid2>
    );
}