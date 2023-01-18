import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Box, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginLayout from "../layouts/CardLayout";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  REACT_APP_CIBUS_API,
  ERROR_MSG_REQUIRED,
  REGEX_EMAIL,
  EMAIL_MAX_LENGTH,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_LAST_NAME,
  MAX_LENGTH_LAST_NAME,
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME
} from "../../constants";

type FormData = {
  password: string;
  name: string;
  mail: string;
  last_name: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDuplicatedUser, setIsDuplicatedUser] = useState(false);
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
          Registro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((formState) => {
            setIsLoading(true);
            axios
              .post(`${REACT_APP_CIBUS_API}/register`, formState)
              .then((res) => {
                console.log(res.data?.msg);
                navigate("/login");
              })
              .catch((err) => {
                console.log("Error:", err);
                setIsDuplicatedUser(true);
              })
              .finally(() => {
                setIsLoading(false);
              });
          })}
        >
          <TextField
            {...register("name", {
              required: ERROR_MSG_REQUIRED,
              minLength: {
                value: MIN_LENGTH_NAME,
                message: `Mínimo ${MIN_LENGTH_NAME} caracteres`
              },
              maxLength: {
                value: MAX_LENGTH_NAME,
                message: `Máximo ${MAX_LENGTH_NAME} caracteres`,
              }
            })}
            label="Nombre"
            error={Boolean(errors.name)}
            helperText={errors.name?.message || " "}
            fullWidth
            type="text"
            size="small"
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("last_name", {
              required: ERROR_MSG_REQUIRED,
              minLength: {
                value: MIN_LENGTH_LAST_NAME,
                message: `Mínimo ${MIN_LENGTH_LAST_NAME} caracteres`
              },
              maxLength: {
                value: MAX_LENGTH_LAST_NAME,
                message: `Máximo ${MAX_LENGTH_LAST_NAME} caracteres`,
              }
            })}
            label="Apellido"
            error={Boolean(errors.last_name)}
            helperText={errors.last_name?.message || " "}
            fullWidth
            type="text"
            size="small"
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("mail", {
              required: ERROR_MSG_REQUIRED,
              pattern: { value: REGEX_EMAIL, message: "Formato incorrecto" },
              maxLength: {
                value: EMAIL_MAX_LENGTH,
                message: `Máximo ${EMAIL_MAX_LENGTH} caracteres`,
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
              message: `Mínimo ${MIN_LENGTH_PASSWORD} caracteres`,
            },
            maxLength: {
              value: MAX_LENGTH_PASSWORD,
              message: `Máximo ${MAX_LENGTH_PASSWORD} caracteres`,
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
          {isDuplicatedUser && <Alert severity="error">Vaya parece que el mail está duplicado!</Alert>}
          <Box display="flex" justifyContent="center" mt={5}>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              size="large"
            >
              Regístrate
            </LoadingButton>
          </Box>
          <Typography sx={{ pt: 5 }}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" style={{ color: "#1D9BF0" }}>
            Inicia sesión
          </Link>
        </Typography>
        </Box>
    </LoginLayout>
  );
};

export default Signin;
