import { Container, Grid2, Typography } from "@mui/material";
import { useModalStore } from "@store/modal.store";
import { PacienteData } from "@tipos/backendTypes";
import { formatDate } from "@utils/date/formatDate";

export const PacienteDetails = () => {
    const { address, birthDate, documentId, emergencyContactInfo, firstName, gender, lastName, phone }: PacienteData = useModalStore(state => state.modalData.data).itemData;

    const DETAILS = [
        {
            label: "DNI",
            value: documentId
        },
        {
            label: "Fecha de nacimiento",
            value: formatDate(birthDate, "yyyy-MM-dd", "dd/MM/yyyy")
        },
        {
            label: "Genero",
            value: gender
        },
        {
            label: "Dirección",
            value: address
        },
        {
            label: "Telefonó",
            value: phone
        },
        {
            label: "Contacto de emergencia",
            value: emergencyContactInfo
        },
    ];

    const fullname = `${firstName} ${lastName}`;
    return (
        <Container sx={{ width: "450px", marginBottom: "1rem" }}>
            <Grid2 container rowSpacing={1} columnSpacing={2}>
                <Grid2 size={12}>
                    <Typography
                        variant="body1"
                        color="primary"
                        fontSize="1.5em"
                        fontWeight="bold"
                        letterSpacing="0.1em"
                    >
                        {fullname}
                    </Typography>
                </Grid2>
                {
                    DETAILS.map(({ label, value }) => (
                        <>
                            <Grid2 size={6}>
                                <Typography color="grey">
                                    {label}
                                </Typography>
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography color="primary">
                                    {value}
                                </Typography>
                            </Grid2>
                        </>
                    ))
                }
            </Grid2>
        </Container>
    );
}