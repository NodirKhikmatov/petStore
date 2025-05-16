import {Box, Container, Stack} from "@mui/material";

import Diveder from "../../components/divider/index";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className={"info"}>
          <Stack className={"static-box"}>
            <Box className={"static-num"}>10 </Box>
            <Box className={"static-text"}>Shops </Box>
          </Stack>
          <Diveder height="64" width="2" bg="#E3C08D" />

          <Stack className={"static-box"}>
            <Box className={"static-num"}>8 </Box>
            <Box className={"static-text"}>Experience </Box>
          </Stack>
          <Diveder height="64" width="2" bg="#E3C08D" />

          <Stack className={"static-box"}>
            <Box className={"static-num"}>100+ </Box>
            <Box className={"static-text"}>Products </Box>
          </Stack>
          <Diveder height="64" width="2" bg="#E3C08D" />

          <Stack className={"static-box"}>
            <Box className={"static-num"}>500+ </Box>
            <Box className={"static-text"}>Clients </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
