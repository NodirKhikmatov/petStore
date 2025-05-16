import {Box, Button, Container, Stack} from "@mui/material";
import {Product, ProductInquiry} from "../../../lib/types/product";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Badge from "@mui/material/Badge";
import {CartItem} from "../../../lib/types/search";
import {Dispatch} from "@reduxjs/toolkit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {ProductCollection} from "../../../lib/enum/product.enum";
import ProductService from "../../services/ProductService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import {createSelector} from "reselect";
import {retrieveProducts} from "./selector";
import {serverApi} from "../../../lib/config";
import {setProducts} from "./slice";
import {useHistory} from "react-router-dom";

/**REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const {onAdd} = props;
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.TOYS,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({...productSearch});
    }
  }, [searchText]);
  /**Handlers */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({...productSearch});
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({...productSearch});
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Stack className="top-title">
              <Box className="top-text">🐾 Pawfect Products</Box>
              <Box className="single-search">
                <input
                  type={"search"}
                  className="single-search-input"
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />

                <Button
                  variant={"contained"}
                  color={"primary"}
                  className="single-button-search"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  search
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.TOYS
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.TOYS)}
              >
                TOYS
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.FOOD
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.FOOD)}
              >
                FOOD
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.COMFYRAVIOLI
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.COMFYRAVIOLI)
                }
              >
                COMFY RAVIOLI
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.AppleCiderRecipe
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.AppleCiderRecipe)
                }
              >
                ACR
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.SSFW
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.SSFW)}
              >
                SSFW
              </Button>
            </Stack>
            <Stack className="products-wapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{
                          background: `url(${imagePath})`,
                        }}
                      >
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img src={"/icons/shopping-cart.svg"} alt="" />
                        </Button>
                        <Button className="view-btn">
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon color="secondary" />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Product are not aviable!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Box className="brand-text">Our Family Brands</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="brands/1.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="brands/2.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="brands/3.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="brands/4.svg" alt="" />
          </Box>
        </Stack>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{marginTop: "60px"}}
              src="https://www.google.com/maps?q=Jeonju,+South+Korea&z=13&ie=UTF8&iwloc=&output=embed"
              height="500px"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
