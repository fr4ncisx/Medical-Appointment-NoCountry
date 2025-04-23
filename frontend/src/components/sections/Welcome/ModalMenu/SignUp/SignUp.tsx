/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@ui/Form/Form";
import {
  SignUpFormData,
  signUpResponsiveUiSchema,
  signUpSchema,
  signUpUiSchema,
} from "./signUpSchema";
import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { FormStyle } from "./SignUpStyles";
import { signUpUser } from "@services/user/signUpUser";
import { CustomError } from "@tipos/types";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useModalStore } from "@store/modal.store";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";

export default function SignUp() {
  const [data, setData] = useState<SignUpFormData>();
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState(false);
  const closeModal = useModalStore((state) => state.closeModal);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = ({ data, errors }: { data: any; errors: any[] }) => {
    setData(data);
    if (errors.length !== 0) {
      setError({
        type: "input",
        description: "entrada invalida en formulario de registro",
      });
    } else {
      setError(null);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    const response = await signUpUser({ data, setError });
    if (response !== null) {
      showSonnerToast({
        title: "Registro Completo",
        description: "Ahora puede iniciar sesión como paciente",
        type: "success",
      });
      closeModal();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Box sx={FormStyle.container}>
        <Box sx={{ ...FormStyle.form, width: isMobile ? "300px" : "500px" }}>
          <Form
            schema={signUpSchema}
            uiSchema={isMobile ? signUpResponsiveUiSchema : signUpUiSchema}
            data={data}
            onChange={handleChange}
          />
          {error?.type === "fetch" && (
            <Typography color="error" textAlign="center">
              {error.description}
            </Typography>
          )}
        </Box>
        <SubmitButton
          label="Registrarse"
          error={error}
          loading={loading}
          handleOnClick={handleSignUp}
        />
      </Box>
    </form>
  );
}
