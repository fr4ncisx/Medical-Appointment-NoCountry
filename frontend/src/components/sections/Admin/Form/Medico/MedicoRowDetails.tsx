import { Container, Grid2, Typography } from "@mui/material";
import { useModalStore } from "@store/modal.store";
import { MedicoData } from "@tipos/backendTypes";

export const MedicoRowDetails = () => {
    const { description, gender, lastname, name, phone, speciality, state }: MedicoData = useModalStore(state => state.modalData.data).itemData;

    const DETAILS = [
        {
            label: "Especialidad",
            value: speciality
        },
        {
            label: "Numero de telefono",
            value: phone
        },
        {
            label: "Genero",
            value: gender
        },
        {
            label: "Provincia",
            value: state
        },
        {
            label: "Descripcion",
            value: description
        }
    ];

    const fullname = `${name} ${lastname}`;

    return (
        <Container sx={{ width: "400px", marginBottom: "1rem" }}>
            <Grid2 container rowSpacing={1}>
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