import {Box, Button, Container, PaginationItem, Stack} from "@mui/material";
import {Product, ProductInquiry} from "../../../lib/types/product";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CartItem} from "../../../lib/types/search";
import {Dispatch} from "@reduxjs/toolkit";
import Pagination from "@mui/material/Pagination";
import {ProductCollection} from "../../../lib/enum/product.enum";
import ProductService from "../../services/ProductService";
import SearchIcon from "@mui/icons-material/Search";
import {createSelector} from "reselect";
import {retrieveProducts} from "./selector";
import {serverApi} from "../../../lib/config";
import {setProducts} from "./slice";
import {useHistory} from "react-router-dom";

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
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          {/* Title & Search */}
          <Box textAlign="center" mt={4}>
            <Box className="top-text">Pawfect Products</Box>
            <Stack
              direction={{xs: "column", sm: "row"}}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mt={3}
              width="100%"
              maxWidth={700}
            >
              <input
                type="search"
                className="single-search-input"
                placeholder="searching products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  fontSize: 20,
                  borderRadius: 10,
                  border: "2px solid #ccc",
                  outline: "none",
                  transition: "border-color 0.3s",
                  fontFamily: "'Open Sans', sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8e44ad")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
                sx={{
                  paddingX: 5,
                  paddingY: 1.8,
                  fontSize: 20,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Search
              </Button>
            </Stack>
          </Box>

          {/* Filter Buttons */}
          <Stack direction="row" spacing={2} className="dishes-filter-section">
            <Button
              className="dishes-filter-button"
              variant="contained"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>

            <Button
              className="dishes-filter-button"
              variant="contained"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>

            <Button
              className="dishes-filter-button"
              variant="contained"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>

          {/* Category Buttons */}
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            {Object.values(ProductCollection).map((collection) => (
              <Button
                key={collection}
                variant="contained"
                color={
                  productSearch.productCollection === collection
                    ? "primary"
                    : "secondary"
                }
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  px: 3,
                  py: 1.3,
                }}
                onClick={() => searchCollectionHandler(collection)}
              >
                {collection}
              </Button>
            ))}
          </Stack>

          {/* Product Grid */}
          <Box
            className="products-wrapper"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(260px, 1fr))"
            gap={4}
            justifyItems="center"
            width="100%"
          >
            {products.length > 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box
                    key={product._id}
                    className="product-card"
                    width="100%"
                    maxWidth={360}
                    borderRadius={4}
                    boxShadow={4}
                    overflow="hidden"
                    onClick={() => chooseDishHandler(product._id)}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      border: "1px solid #e0e0e0",
                      "&:hover": {
                        transform: "scale(1.06)",
                        boxShadow: "0 10px 25px rgba(245, 235, 235, 0.15)",
                        "& .shop-btn, & .view-btn": {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <Box
                      className="product-img"
                      sx={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: {xs: 200, md: 250},
                        position: "relative",
                      }}
                    >
                      {/* Shop Button */}
                      <Button
                        className="shop-btn"
                        sx={{
                          position: "absolute",
                          bottom: 14,
                          right: 14,
                          width: 36,
                          height: 36,
                          borderRadius: "12px",
                          bgcolor: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 5,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }}
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
                        <img
                          src="/icons/shopping-cart.svg"
                          alt="cart"
                          style={{width: 20, height: 20, filter: "invert(1)"}}
                        />
                      </Button>

                      {/* View Button */}
                      <Button
                        className="view-btn"
                        sx={{
                          position: "absolute",
                          bottom: 14,
                          left: 14,
                          width: 36,
                          height: 36,
                          borderRadius: "12px",
                          bgcolor: "secondary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 5,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            bgcolor: "secondary.dark",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          chooseDishHandler(product._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          height="20"
                          viewBox="0 0 24 24"
                          width="20"
                        >
                          <path d="M12 6a9.77 9.77 0 0 0-9.44 6 9.77 9.77 0 0 0 18.88 0A9.77 9.77 0 0 0 12 6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      </Button>
                    </Box>

                    {/* Product Info */}
                    <Box
                      p={2}
                      textAlign="center"
                      sx={{fontFamily: "'Open Sans', sans-serif"}}
                    >
                      <Box
                        component="h3"
                        fontSize={{xs: 18, md: 22}}
                        fontWeight={600}
                        color="#333"
                        mb={1}
                        textTransform="capitalize"
                      >
                        {product.productName}
                      </Box>
                      <Box
                        fontSize={{xs: 16, md: 18}}
                        fontWeight={700}
                        color="#8e44ad"
                      >
                        ${product.productPrice.toFixed(2)}
                      </Box>
                      <Box fontSize={14} color="#888" mt={0.5}>
                        👁️ {product.productViews} views
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box mt={8} fontSize={20} color="#666">
                No products found
              </Box>
            )}
          </Box>

          {/* Pagination */}
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
            <img src="/brands/1.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/brands/2.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/brands/3.svg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/brands/4.svg" alt="" />
          </Box>
        </Stack>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{marginTop: "60px"}}
              src="https://www.google.com/maps?q=Burak+restaurand+istanbul&amp;t&amp;z=13&amp;ie=UTF8&amp;iwloc&amp;output=embed"
              height="500px"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
