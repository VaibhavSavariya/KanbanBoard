"use client";
import React from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  return (
    <>
      <Container
        // maxWidth=""
        sx={{
          mt: isXs ? 10 : 20,
        }}
      >
        <Stack mb={6} spacing={2} alignItems={"center"} textAlign={"center"}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "700",
            }}
          >
            See the big picture with Todoist Boards Boards are a powerful.
          </Typography>
          {!isXs && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "24px",
              }}
            >
              flexible way to organize your projects. Drag tasks between
              sections, invite your teammates to join in, and visualize your
              progress.
            </Typography>
          )}
          <Button
            onClick={() => {
              router.push("/login");
            }}
            size="large"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Get Started
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
