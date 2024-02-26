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
      {isXs ? (
        <>
          <Container
            // maxWidth=""
            sx={{
              mt: isXs ? 10 : 20,
            }}
          >
            <Stack
              mb={6}
              spacing={2}
              alignItems={"center"}
              textAlign={"center"}
            >
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
      ) : (
        <>
          <img
            src={
              "https://atlassianblog.wpengine.com/wp-content/uploads/2024/01/kanban-101-final-1.png"
            }
            style={{
              position: "absolute",
              zIndex: -10,
              height: "100vh",
              width: "100vw",
            }}
            alt="kanban board"
          />

          <Stack alignItems={"center"} textAlign={"center"}>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 55,
                backgroundColor: "#A978CD",
                color: "white",
              }}
              onClick={() => {
                router.push("/login");
              }}
              size="large"
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
            >
              Get Started
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default Home;
