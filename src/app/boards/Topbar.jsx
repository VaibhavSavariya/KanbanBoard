import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import LogoImg from "../assets/logo.svg";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const Topbar = ({ openModal }) => {
  const router = useRouter();
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      const res = await fetch("/api/logout");
      secureLocalStorage.removeItem("Me");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.log("error:", error);
    }
  };
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
            {isXs ? (
              <>
                <IconButton onClick={openModal}>
                  <AddCircleIcon color="primary" />
                </IconButton>
                <IconButton onClick={handleLogOut}>
                  <Logout />
                </IconButton>
              </>
            ) : (
              <>
                <Button onClick={openModal} variant="contained">
                  Create Board
                </Button>

                <Button
                  onClick={handleLogOut}
                  startIcon={<Logout />}
                  color="inherit"
                >
                  {" "}
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;
