import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import Basket from "./Basket";
import {CartItem} from "../../../lib/types/search";
import {Logout} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import React from "react";
import {serverApi} from "../../../lib/config";
import {useGlobals} from "../../Hooks/useGlobal";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    setSignupOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props;

  const {authMember} = useGlobals();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className="home-lines">
            <NavLink to="/">
              <svg
                width="240"
                height="60"
                viewBox="0 0 240 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="45"
                  fontFamily="Verdana, sans-serif"
                  fontSize="27"
                  fill="#A0522D" // SaddleBrown
                  fontWeight="bold"
                >
                  🐾 Pawfect Care
                </text>
              </svg>
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className="home-line">
              <NavLink to="/" className="home-link" activeClassName="active">
                Home
              </NavLink>
            </Box>
            <Box className="home-line">
              <NavLink
                to="/products"
                className="home-link"
                activeClassName="active"
              >
                Products
              </NavLink>
            </Box>
            {authMember && (
              <Box className="home-line">
                <NavLink
                  to="/orders"
                  className="home-link"
                  activeClassName="active"
                >
                  Orders
                </NavLink>
              </Box>
            )}
            {authMember && (
              <Box className="home-line">
                <NavLink
                  to="/members-page"
                  className="home-link"
                  activeClassName="active"
                >
                  My page
                </NavLink>
              </Box>
            )}
            <Box className="home-line">
              <NavLink
                to="/help"
                className="home-link"
                activeClassName="active"
              >
                Help
              </NavLink>
            </Box>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt="User avatar"
                aria-haspopup="true"
                onClick={handleLogoutClick}
              />
            )}

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              transformOrigin={{horizontal: "right", vertical: "top"}}
              anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{color: "blue"}} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
              Providing trusty{" "}
              <span className="highlight-pet"> 🐾 Pawfect Care </span> products
            </Box>

            <Box className={"wel-txt"}>
              Healthy, Delicious, and Tail-Wagging Good
            </Box>
            <Box className={"service-txt"}>24/7 Delivery Service</Box>
            <Box className={"signup"}>
              {!authMember && (
                <Button
                  variant="contained"
                  className={"signup-button"}
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
