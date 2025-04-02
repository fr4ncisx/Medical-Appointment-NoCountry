import { Box, Typography } from "@mui/material";
import { CustomError } from "@tipos/types";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import ReplayIcon from '@mui/icons-material/Replay';

interface Props {
    error: CustomError
    handleRetry: () => void;
}

export const RetryConnectionButton = ({ error, handleRetry }: Props) => {
    if (!error) return null;
    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="h6" color="error" mb=".3rem">
                {error.description}
            </Typography>
            <CustomButton onClick={handleRetry} startIcon={<ReplayIcon />}>
                <Typography textTransform="none">
                    Reintentar conexión 
                </Typography>
            </CustomButton>
        </Box>
    );
}