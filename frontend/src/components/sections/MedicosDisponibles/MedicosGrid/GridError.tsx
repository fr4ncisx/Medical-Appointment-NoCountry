import { Box, Typography } from "@mui/material";

interface Props {
    description: string
}

export const GridError = ({ description }: Props) => {
    return (
        <Box textAlign="center" height="calc(100vh - 80px)">
            <Box sx={{ backgroundColor: "#ff000015", borderRadius: "10px", padding: "1rem" }}>
                <Typography color="error" variant="h5">
                    {`Ocurrio un error: ${description}`}
                </Typography>
            </Box>
        </Box>
    );
}