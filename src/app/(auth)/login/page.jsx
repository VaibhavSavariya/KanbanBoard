"use client";
import {
  Button,
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoImg from "../../assets/logo.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const { isPending, data } = useQuery({
  //   queryKey: ["userDoc"],
  //   queryFn: onAuthStateChanged(auth, (userDoc) => {
  //     if (userDoc) {
  //       return console.log("userDoc", userDoc);
  //     } else return null;
  //   }),
  // });

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (userDoc) => {
      if (userDoc) {
        return console.log("userDoc", userDoc);
      } else return null;
    });

    return () => unSub;
  }, []);

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          mt: 10,
        }}
      >
        <Stack mb={6} spacing={4} alignItems={"center"} textAlign={"center"}>
          <Image src={LogoImg} height={"auto"} width={200} alt="app-logo" />
          <Typography color="rgba(255,255,255,.6)">
            Visualize Your Workflow for Increased Productivity.
            <br />
            Access Your Tasks Anytime, Anywhere
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(2, "Too Short!")
                .max(50, "Too Long!")
                .required("Required"),
              email: Yup.string().email("Invalid email").required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);
                if (isLoggedIn) {
                  await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                } else {
                  await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                }
              } catch (err) {
                setLoading(false);
                const msg = err.code.split("auth/")[1].split("-").join(" ");
                return toast.error(msg);
              }
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Stack spacing={2} alignItems={"center"} textAlign={"center"}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                  />
                  <ErrorMessage
                    name="title"
                    render={(msg) => (
                      <p
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {msg}
                      </p>
                    )}
                  />
                  <Field
                    component={TextField}
                    type="password"
                    label="Password"
                    name="password"
                  />
                  <ErrorMessage
                    name="title"
                    render={(msg) => (
                      <p
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {msg}
                      </p>
                    )}
                  />
                  {/* {isSubmitting && <LinearProgress />} */}
                  <Button
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {isLoggedIn ? "Login" : "Register"}
                  </Button>
                </Stack>
                <Typography
                  onClick={() => {
                    setIsLoggedIn(!isLoggedIn);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                  textAlign={"center"}
                  mt={3}
                >
                  {isLoggedIn
                    ? "Do no have an account?"
                    : "Already have an account?"}
                </Typography>
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
