import { MainLayout } from "../../layouts";
import useSWR from "swr";
import { REACT_APP_CIBUS_API } from "../../../constants";
import { useCookie } from "../../../hooks";
import { fetcher } from "../../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  Skeleton,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Restaurant } from "../../../types/restaurants";
import { useState } from "react";
import RestaurantForm from "./RestaurantForm";

const RestaurantDetail = () => {
  const navigate = useNavigate();
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const { restaurantId } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const { data: restaurant, mutate: refreshDetail } = useSWR<Restaurant>(
    tokenCookie
      ? [`${REACT_APP_CIBUS_API}/restaurants/${restaurantId}`, tokenCookie]
      : null,
    () =>
      fetcher(
        `${REACT_APP_CIBUS_API}/restaurants/${restaurantId}`,
        tokenCookie as string
      )
  );

  return (
    <MainLayout>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 4 }}>
          <Button onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon />
            Volver a restaurantes
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              setIsOpen(true);
            }}
          >
            Editar
          </Button>
        </Box>
        {restaurant ? (
          <>
            <Typography variant="h4">{restaurant?.name}</Typography>
            <Typography variant="h6">
              Dirección: {restaurant?.address}
            </Typography>
          </>
        ) : (
          <>
            <Skeleton width={300} height={50} />
            <Skeleton width={300} height={50} />
          </>
        )}
      </Container>

      <Dialog open={isOpen} onClose={handleClose}>
        {isOpen && (
          <RestaurantForm
            handleClose={handleClose}
            data={restaurant}
            refreshDetail={refreshDetail}
          />
        )}
      </Dialog>
    </MainLayout>
  );
};

export default RestaurantDetail;
