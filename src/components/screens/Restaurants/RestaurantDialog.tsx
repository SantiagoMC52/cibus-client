import { LoadingButton } from "@mui/lab";
import { Box, Dialog, DialogTitle, TextField } from "@mui/material";
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

type Props = {
  open: boolean;
  onClose: () => void;
  refreshRestaurants: any;
};

type FormData = {
  name: string;
  address: string;
};
const RestaurantDialog = ({ open, onClose, refreshRestaurants }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    shouldFocusError: false,
  });

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 400,
          minHeight: 350,
          borderRadius: 4,
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle mt={2}>Añade un restaurante</DialogTitle>
      <Box
        component="form"
        sx={{ p: 2 }}
        onSubmit={handleSubmit((formState) => {
          setIsLoading(true);
          axios
            .post(`${REACT_APP_CIBUS_API}/restaurants`, formState, {
              headers: { Authorization: `Bearer ${tokenCookie}` },
            })
            .then((res) => {
              refreshRestaurants();
              reset();
              onClose();
              enqueueSnackbar("Restaurante añadido correctamente", {
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
          sx={{ mt: 3 }}
        />

        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="center"
          gap={3}
          mt={4}
        >
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            size="large"
          >
            Añadir
          </LoadingButton>
          <LoadingButton
            variant="contained"
            size="large"
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RestaurantDialog;
