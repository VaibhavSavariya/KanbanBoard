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
import useStore from "@/store";
import AppLoader from "@/app/components/layout/loader/AppLoader";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import users from "@/app/axios/services/users";
import { getAccessToken } from "@/helpers/getAccessToken";
const Login = () => {
  const Router = useRouter();
  const { loader, setLoginState, isLoggedIn } = useStore();
  const [loading, setLoading] = useState(false);
  const [isLoggedInPage, setIsLoggedInPage] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (userDoc) => {
      console.log("userDoc:", userDoc);
      setLoginState(!!userDoc);
      secureLocalStorage.setItem("Me", JSON.stringify(userDoc?.uid));
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
                if (isLoggedInPage) {
                  // const userCredential = await signInWithEmailAndPassword(
                  //   auth,
                  //   values.email,
                  //   values.password
                  // );
                  // const { user } = userCredential;
                  // const jwt = await user.getIdToken();
                  // const rawResponse = await fetch("/api/login", {
                  //   method: "POST",
                  //   headers: {
                  //     Accept: "application/json",
                  //     "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify({ jwt }),
                  // });
                  // const content = await rawResponse.json();

                  // console.log(content);
                  const res = await users.loginUser(values);
                  if (res?.status === 200) {
                    secureLocalStorage.setItem(
                      "Me",
                      JSON.stringify(res?.data?.tokenData?.id)
                    );
                    Router.push("/boards");
                    Router.refresh();
                  }
                } else {
                  const res = await users.registerUser(values);
                  setIsLoggedInPage(false);
                }
              } catch (err) {
                console.log("err:", err);
                setLoading(false);
                return toast.error(err?.response?.data?.error);
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

                  <Button
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || loading}
                    onClick={submitForm}
                  >
                    {isLoggedInPage ? "Login" : "Register"}
                  </Button>
                </Stack>
                <Typography
                  onClick={() => {
                    setIsLoggedInPage(!isLoggedInPage);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                  textAlign={"center"}
                  mt={3}
                >
                  {isLoggedInPage
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
