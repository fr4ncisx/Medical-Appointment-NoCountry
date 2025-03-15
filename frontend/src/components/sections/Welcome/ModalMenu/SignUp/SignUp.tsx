import { Form } from "@ui/Form/Form";
import { FormData, signUpSchema, signUpUiSchema } from "./signUpSchema";
import { FormEvent, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import { FormStyle } from "./SignUpStyles";
import { useNavigate } from "react-router";
import { useUserStore } from "@store/user.store";
import { useModalStore } from "@store/modal.store";

export default function SignUp() {
    const [data, setData] = useState<FormData>();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const getDashboardUrl = useUserStore(state => state.getUserDashboardURL);
    const redirectTo = useModalStore(state => state.modalData.redirect);

    const handleChange = ({ data, errors }: { data: any, errors: any }) => {
        setData(data);
        if (errors.length !== 0) {
            setError(true);
        } else {
            setError(false);
        }
    }

    // TODO crear logica de registro de usuario paciente y mover funcion a archivo externo
    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signup = false;
        if (signup) {
            const dashboard = getDashboardUrl();
            const to = (redirectTo !== null && redirectTo !== undefined) ? redirectTo : dashboard;
            navigate(to);
        }
    }
    return (
        <form onSubmit={handleSignUp}>
            <Box sx={FormStyle.container}>
                <Box sx={FormStyle.form}>
                    <Form schema={signUpSchema} uiSchema={signUpUiSchema} data={data} onChange={handleChange} />
                </Box>
                <CustomButton type="submit" disabled={error}>
                    <Typography textTransform="none" >
                        Registrarse
                    </Typography>
                </CustomButton>
            </Box>
        </form>
    );
}