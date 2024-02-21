import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import LogoImg from "../assets/logo.svg";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
const Topbar = ({ openModal }) => {
  const router = useRouter();
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
            <Button
              onClick={() => {
                signOut(auth);
                secureLocalStorage.removeItem("Me");
                router.push("/login");
                router.refresh();
              }}
              startIcon={<Logout />}
              color="inherit"
            >
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
