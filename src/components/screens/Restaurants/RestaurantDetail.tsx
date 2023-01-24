/* eslint-disable multiline-ternary */
import { MainLayout } from "../../layouts";
import useSWR from "swr";
import { REACT_APP_CIBUS_API } from "../../../constants";
import { useCookie } from "../../../hooks";
import { fetcher } from "../../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Skeleton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Restaurant } from "../../../types/restaurants";

const RestaurantDetail = () => {
  const navigate = useNavigate();
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");
  const { restaurantId } = useParams();

  const { data: restaurant } = useSWR<Restaurant>(
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
        <Button onClick={() => navigate(-1)} sx={{ mb: 4 }}>
          <KeyboardArrowLeftIcon />
          Volver a restaurantes
        </Button>
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
    </MainLayout>
  );
};

export default RestaurantDetail;
