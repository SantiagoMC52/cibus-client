import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  EMAIL_MAX_LENGTH,
  ERROR_MSG_REQUIRED,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
  REACT_APP_CIBUS_API,
  REGEX_EMAIL,
} from "../../constants";
import { useCookie } from "../../hooks";
import LoginLayout from "../layouts/CardLayout";
import { useState } from "react";

type FormData = {
  mail: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookie("USER_ACCESS_TOKEN");
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const previousLocation = state?.location?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    shouldFocusError: false,
  });

  return (
    <LoginLayout>
      <Typography variant="h5" textAlign="center" mb={3}>
        Iniciar sesión
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(async (formState) => {
          setIsLoading(true);
          try {
            const res = await axios.post(
              `${REACT_APP_CIBUS_API}/login`,
              formState
            );
            setCookie(res.data?.access_token);
          } catch (err) {
            console.log("Error:", err);
          } finally {
            setIsLoading(false);
            navigate(previousLocation ?? "/profile");
          }
        })}
      >
        <TextField
          {...register("mail", {
            required: ERROR_MSG_REQUIRED,
            pattern: { value: REGEX_EMAIL, message: "Formato incorrecto" },
            maxLength: {
              value: EMAIL_MAX_LENGTH,
              message: "Máximo 50 caracteres",
            },
          })}
          label="Correo electrónico"
          error={Boolean(errors.mail)}
          helperText={errors.mail?.message || " "}
          fullWidth
          type="email"
          size="small"
          sx={{ mt: 2 }}
        />

        <TextField
          {...register("password", {
            required: ERROR_MSG_REQUIRED,
            minLength: {
              value: MIN_LENGTH_PASSWORD,
              message: "Mínimo 8 caracteres",
            },
            maxLength: {
              value: MAX_LENGTH_PASSWORD,
              message: "Máximo 20 caracteres",
            },
          })}
          label="Contraseña"
          error={Boolean(errors.password)}
          helperText={errors.password?.message || " "}
          fullWidth
          type="password"
          size="small"
          sx={{ mt: 2 }}
        />

        <Box display="flex" justifyContent="center" mt={5}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            size="large"
          >
            Iniciar sesión
          </LoadingButton>
        </Box>

        <Typography sx={{ pt: 5 }}>
          ¿No tienes una cuenta?{" "}
          <Link to="/signin" style={{ color: "#1D9BF0" }}>
            Regístrate
          </Link>
        </Typography>
      </Box>
    </LoginLayout>
  );
};

export default Login;
