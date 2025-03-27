import { CustomButton } from "@ui/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    url: string
}

export const BackButton = ({ url }: Props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(url);
    }
    return (
        <CustomButton startIcon={<ArrowBackIcon />} onClick={handleClick} sx={{ textTransform: "none", marginBottom: "2rem" }}>
            Volver
        </CustomButton>
    );
}