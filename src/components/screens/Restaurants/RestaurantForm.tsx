import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  RESTAURANT_MIN_LENGHT,
  ERROR_MSG_REQUIRED,
  RESTAURANT_MAX_LENGHT,
  REACT_APP_CIBUS_API,
} from "../../../constants";
import axios from "axios";
import { useState } from "react";
import { useCookie } from "../../../hooks";
import { useSnackbar } from "notistack";
import { Restaurant } from "../../../types/restaurants";
import { CardLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";

type Props = {
  handleClose: () => void;
  refreshRestaurants?: any;
  refreshDetail?: any;
  data?: Restaurant;
};

type FormData = {
  name: string;
  address: string;
};
const RestaurantForm = ({
  handleClose,
  refreshRestaurants,
  refreshDetail,
  data,
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data || {},
    mode: "onTouched",
    shouldFocusError: false,
  });

  return (
    <CardLayout>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {data ? "Edita el restaurante" : "Añade un restaurante"}
      </Typography>
      <Box
        component="form"
        sx={{ p: 2 }}
        onSubmit={handleSubmit((formState) => {
          setIsLoading(true);
          axios({
            method: data ? "PUT" : "POST",
            headers: { Authorization: `Bearer ${tokenCookie}` },
            url: data
              ? `${REACT_APP_CIBUS_API}/restaurants/${data.id}`
              : `${REACT_APP_CIBUS_API}/restaurants`,
            data: data
              ? { name: formState.name, address: formState.address }
              : formState,
          })
            .then((res) => {
              if (res.config.method === "post") {
                refreshRestaurants();
                reset();
              } else {
                refreshDetail();
              }
            })
            .then(() => {
              handleClose();
              enqueueSnackbar("Restaurante guardado correctamente", {
                variant: "success",
              });
            })
            .catch((err) => console.log("Error", err))
            .finally(() => setIsLoading(false));
        })}
      >
        <TextField
          {...register("name", {
            required: ERROR_MSG_REQUIRED,
            minLength: {
              value: RESTAURANT_MIN_LENGHT,
              message: `Mínimo ${RESTAURANT_MIN_LENGHT} caracteres`,
            },
            maxLength: {
              value: RESTAURANT_MAX_LENGHT,
              message: `Mínimo ${RESTAURANT_MAX_LENGHT} caracteres`,
            },
          })}
          label="Nombre del restaurante"
          error={Boolean(errors.name)}
          helperText={errors.name?.message || " "}
          fullWidth
          type="text"
          size="small"
          defaultValue={data?.name}
        />

        <TextField
          {...register("address", {
            required: ERROR_MSG_REQUIRED,
          })}
          label="Dirección del restaurante"
          error={Boolean(errors.address)}
          helperText={errors.address?.message || " "}
          fullWidth
          type="text"
          size="small"
          sx={{ mt: 2 }}
          defaultValue={data?.address}
        />

        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="center"
          gap={3}
          mt={4}
        >
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            size="large"
          >
            {data ? "Editar" : "Añadir"}
          </LoadingButton>
          <LoadingButton
            variant="contained"
            size="large"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </LoadingButton>
          {data ? (
            <LoadingButton
              onClick={() =>
                axios
                  .delete(`${REACT_APP_CIBUS_API}/restaurants/${data.id}`, {
                    headers: { Authorization: `Bearer ${tokenCookie}` },
                  })
                  .then(() => {
                    navigate("/restaurants");
                    handleClose();
                    enqueueSnackbar("Restaurante eliminado correctamente", {
                      variant: "success",
                    });
                  })
              }
              color="error"
            >
              Eliminar
            </LoadingButton>
          ) : null}
        </Box>
      </Box>
    </CardLayout>
  );
};

export default RestaurantForm;
