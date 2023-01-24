import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { REACT_APP_CIBUS_API } from "../../../constants";
import { fetcher } from "../../../helpers";
import { useCookie } from "../../../hooks";
import { MainLayout } from "../../layouts";
import useSWR from "swr";
import { useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { Link } from "react-router-dom";
import { Restaurant } from "../../../types/restaurants";

const Restaurants = () => {
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    data: restaurants,
    mutate,
    isLoading,
  } = useSWR<Restaurant[]>(
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
        {restaurants?.length === 0 ? (
          "Aún no tienes restaurantes"
        ) : (
          <Grid container spacing={3}>
            {restaurants?.map((restaurant: Restaurant) => {
              return (
                <Grid item key={restaurant.id} xs={12} sm={4}>
                  {!isLoading ? (
                    <Link to={`/restaurants/${restaurant.id}`}>
                      <Paper sx={{ p: 5 }}>
                        <Typography variant="h6">{restaurant.name}</Typography>
                      </Paper>
                    </Link>
                  ) : (
                    <Skeleton variant="rectangular" height={118} />
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      <Dialog open={isOpen} onClose={handleClose}>
        {isOpen && (
          <RestaurantForm
            refreshRestaurants={mutate}
            handleClose={handleClose}
          />
        )}
      </Dialog>
    </MainLayout>
  );
};

export default Restaurants;
