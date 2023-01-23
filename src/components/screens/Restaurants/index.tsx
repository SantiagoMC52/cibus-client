/* eslint-disable multiline-ternary */
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { REACT_APP_CIBUS_API } from "../../../constants";
import { fetcher } from "../../../helpers";
import { useCookie } from "../../../hooks";
import { MainLayout } from "../../layouts";
import useSWR from "swr";
import { Restaurant } from "../../../types/user";
import { useState } from "react";
import RestaurantDialog from "./RestaurantDialog";

const Restaurants = () => {
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const { data: restaurants, mutate } = useSWR<Restaurant[]>(
    tokenCookie ? [`${REACT_APP_CIBUS_API}/restaurants`, tokenCookie] : null,
    () => fetcher(`${REACT_APP_CIBUS_API}/restaurants`, tokenCookie as string)
  );

  return (
    <MainLayout>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: { xs: 2, sm: 5 } }}>
            Restaurantes
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setIsOpen(true)}
          >
            Añadir restaurante
          </Button>
        </Box>
        {restaurants ? (
          <Grid container spacing={3}>
            {(restaurants || []).map((restaurant: Restaurant) => {
              return (
                <Grid item key={restaurant.id} xs={12} sm={4}>
                  <Paper sx={{ p: 5 }}>
                    <Typography variant="h6">{restaurant.name}</Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          "Aún no tienes restaurantes"
        )}
      </Container>

      <RestaurantDialog
        open={isOpen}
        onClose={handleClose}
        refreshRestaurants={mutate}
      />
    </MainLayout>
  );
};

export default Restaurants;
