import { Box, CircularProgress, List, Typography } from "@mui/material";
import { useScheduleContext } from "@context/schedule.context";
import { AgendaError } from "../AgendaError";
import { AgendaItem } from "./AgendaItem";

export const Agenda = () => {
    const { schedules, loadingSchedules, errorSchedules, fetchSchedules } = useScheduleContext();

    if (loadingSchedules) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress color="primary" size="2rem" />
            </Box>
        );
    }

    if (errorSchedules) {
        return <AgendaError error={errorSchedules} handleRetry={fetchSchedules} />;
    }

    return (
        <List>
            {
                schedules.length !== 0
                    ? schedules.map(item => (
                        <AgendaItem key={item.id} item={item} />
                    ))
                    : (
                        <Box display="flex" alignItems="center" flexDirection="column">
                            <Typography variant="h6" color="error" mb=".3rem">
                                No se encontraron horarios para este médico
                            </Typography>
                        </Box>
                    )
            }
        </List>
    );
}