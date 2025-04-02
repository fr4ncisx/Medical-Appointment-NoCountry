import { Box, CircularProgress, List } from "@mui/material";
import { useScheduleContext } from "@context/schedule.context";
import { RetryConnectionButton } from "../RetryConnectionButton";
import { AgendaItem } from "./AgendaItem";

export const Agenda = () => {
    const { schedules, loadingSchedules, errorSchedules, fetchSchedules } = useScheduleContext();

    if (loadingSchedules) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 200px)">
                <CircularProgress color="primary" size="2rem" />
            </Box>
        );
    }

    if (errorSchedules) {
        return <RetryConnectionButton error={errorSchedules} handleRetry={fetchSchedules} />;
    }

    return (
        <List>
            {
                schedules.map(item => (
                    <AgendaItem key={item.id} item={item} />
                ))
            }
        </List>
    );
}