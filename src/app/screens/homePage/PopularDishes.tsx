import {Box, Container, Stack} from "@mui/material";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import {CssVarsProvider} from "@mui/joy/styles";
import {Product} from "../../../lib/types/product";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {createSelector} from "reselect";
import {retrievePopularDishes} from "./selector";
import {serverApi} from "../../../lib/config";
import {useSelector} from "react-redux";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({popularDishes})
);

export default function PopularDishes() {
  const {popularDishes} = useSelector(popularDishesRetriever);

  return (
    <div className="popular-dishes-frame homepage">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Best Selling Products</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card
                      className="card hover-card"
                      sx={{position: "relative"}}
                    >
                      <CardCover>
                        <img src={imagePath} alt="Product Image" />
                      </CardCover>
                      <CardCover className="card-cover" />
                      <Box className="hover-overlay">
                        <h2>{product.productName}</h2>
                        <p>{product.productDesc}</p>
                        <div className="views">
                          {product.productViews}
                          <VisibilityIcon />
                        </div>
                      </Box>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
