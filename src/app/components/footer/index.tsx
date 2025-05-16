import {Box, Container, Stack} from "@mui/material";

import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #3b322c; /* Earthy brown */
  color: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection="row" sx={{mt: "94px"}}>
          <Stack flexDirection="column" style={{width: "340px"}}>
            <Box>
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
            </Box>
            <Box
              className="foot-desc-txt"
              sx={{mt: 2, fontSize: "14px", color: "#d3d3d3"}}
            >
              Pawfect Care provides gentle, expert grooming and wellness
              services for your beloved pets—because they deserve nothing less.
            </Box>
            <Box
              className="sns-context"
              sx={{mt: 2, display: "flex", gap: "12px"}}
            >
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Box>
          </Stack>
          <Stack sx={{ml: "288px"}} flexDirection="row">
            <Stack>
              <Box>
                <Box
                  className="foot-category-title"
                  sx={{fontWeight: "bold", mb: 1}}
                >
                  Services
                </Box>
                <Box
                  className="foot-category-link"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#ccc",
                  }}
                >
                  <Link to="/">Home</Link>
                  <Link to="/products"> Products</Link>
                  <Link to="/help">Help</Link>

                  <Link to="/contact">Contact Us</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ml: "100px"}}>
              <Box>
                <Box
                  className="foot-category-title"
                  sx={{fontWeight: "bold", mb: 1}}
                >
                  Contact
                </Box>
                <Box
                  flexDirection="column"
                  sx={{mt: "20px", gap: 2, color: "#ccc"}}
                  className="foot-category-link"
                >
                  <Box className="find-us">
                    📍 123 Pet Lane, Seoul, South Korea
                  </Box>
                  <Box className="find-us">📞 +82 10 1234 5678</Box>
                  <Box className="find-us">📧 care@pawfectcare.kr</Box>
                  <Box className="find-us">🕒 Mon - Sat: 9am - 7pm</Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{border: "1px solid #C5C8C9", width: "100%", opacity: "0.2"}}
          sx={{mt: "80px"}}
        ></Stack>
        <Stack
          className="copyright-txt"
          sx={{mt: 3, color: "#aaa", fontSize: "12px"}}
        >
          © 2025 Pawfect Care. All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
