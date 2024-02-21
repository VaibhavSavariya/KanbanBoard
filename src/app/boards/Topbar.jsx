import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import LogoImg from "../assets/logo.svg";
import { Logout } from "@mui/icons-material";
const Topbar = ({ openModal }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Image src={LogoImg} alt="FlowBoard" width={150} height={"auto"} />
          <Stack direction={"row"} spacing={2}>
            <Button onClick={openModal} variant="contained">
              Create Board
            </Button>
            <Button startIcon={<Logout />} color="inherit">
              {" "}
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;
