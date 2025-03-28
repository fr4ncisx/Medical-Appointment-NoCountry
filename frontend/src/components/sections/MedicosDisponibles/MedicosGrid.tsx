import { MedicCard } from "./MedicCard";
import { MedicoData } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { useUserStore } from "@store/user.store";
import { useState, useEffect } from "react";
import { getMedicos } from "@services/medic/getMedicos";
import { Box, Grid2, Typography } from "@mui/material";

export const MedicosGrid = () => {
    const [medicos, setMedicos] = useState<MedicoData[]>([]);
    const [error, setError] = useState<CustomError>(null);
    const [loading, setLoading] = useState(false);
    const token = useUserStore(state => state.getToken)();

    useEffect(() => {
        getMedicos({ token, setDataRows: setMedicos, setLoading, setError });
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
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px, 1fr))",
            gap: "0.5rem"
        }}>
            {
                !error && !loading && (
                    medicos.map((doctor) => (
                        <MedicCard key={doctor.id} doctor={doctor} />
                    ))
                )
            }
        </Box>
    );
}