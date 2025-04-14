import { MedicCard } from "../MedicCard";
import { MedicoData } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { useUserStore } from "@store/user.store";
import { useState, useEffect } from "react";
import { getMedicos } from "@services/medic/getMedicos";
import { Box } from "@mui/material";
import { GridLoading } from "./GridLoading";
import { GridError } from "./GridError";

export const MedicosGrid = () => {
    const [medicos, setMedicos] = useState<MedicoData[]>([]);
    const [error, setError] = useState<CustomError>(null);
    const [loading, setLoading] = useState(false);
    const token = useUserStore(state => state.getToken)();

    useEffect(() => {
        getMedicos({ token, setDataRows: setMedicos, setLoading, setError });
    }, []);


    if (loading) {
        return <GridLoading />;
    }

    if (error) {
        return <GridError description={error.description} />;
    }
    return (
        <Box display="grid" gap=".5rem" gridTemplateColumns="repeat(auto-fill,minmax(200px, 1fr))">
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