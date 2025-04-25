import { Typography } from "@mui/material";

interface Props {
    label: string
}

export const CustomInputLabel = ({label}: Props) => {
    return (
        <Typography variant="body1" color="primary" sx={{ marginBottom: ".3em" }}>
            {label}
        </Typography>
    );
}