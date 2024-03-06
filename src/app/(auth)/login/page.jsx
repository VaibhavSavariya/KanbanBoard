"use client";
import {
  Checkbox,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import LogoImg from "../../assets/logo.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import users from "@/app/axios/services/users";
import LoadingButton from "@mui/lab/LoadingButton";
import { LoginTwoTone, VpnKeySharp } from "@mui/icons-material";
import "./style.css";
import secureLocalStorage from "react-secure-storage";
const Login = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoggedInPage, setIsLoggedInPage] = useState(true);
  const [isVerifyPage, setIsVerifyPage] = useState(false);
  const [otp, setOtp] = useState("");
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const otpRef = [useRef(), useRef(), useRef(), useRef()];
  const handleOtp = (index, e) => {
    const value = otpRef[index].current.value;
    const code = e.keyCode;

    if (isValidCharacter(code)) {
      setOtp((prevOtp) => {
        const updatedOtp =
          prevOtp.slice(0, index) + value + prevOtp.slice(index + 1);
        return updatedOtp;
      });

      // Move focus to the next input field if available
      if (value.length === 1 && index < otpRef.length - 1) {
        otpRef[index + 1].current.focus();
      }
    } else if (code === 8) {
      // Move focus to the previous input field if backspace is pressed
      if (index > 0) {
        otpRef[index - 1].current.focus();
      }

      // Clear the current input field
      setOtp((prevOtp) => prevOtp.slice(0, index) + prevOtp.slice(index + 1));
    } else {
      console.log("Character is not valid");
    }
  };

  const isValidCharacter = (code) => {
    return (code >= 48 && code <= 57) || (code >= 96 && code <= 105);
  };
  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      if (isVerifyPage) {
        const res = await users.verifyEmail(otp);
        if (res?.status === 201) {
          setLoading(false);
          setIsVerifyPage(false);
          setIsLoggedInPage(true);
          toast.success("Otp verified successfully!");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  return (
    <>
      {!isXs && isVerifyPage ? (
        <>
          <Container
            maxWidth="xs"
            sx={{
              mt: 10,
            }}
          >
            <Stack
              mb={6}
              spacing={4}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Image src={LogoImg} height={"auto"} width={200} alt="app-logo" />
              <Typography color="rgba(255,255,255,.6)">
                We have sent a verification code to you mail address
                <br />
                Please check it and verify your mail address.
              </Typography>
              <Formik
                initialValues={{
                  otp: "",
                }}
                validationSchema={Yup.object({
                  otp: Yup.string().required("Required"),
                })}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    <Stack
                      spacing={2}
                      alignItems={"center"}
                      textAlign={"center"}
                      className="otpInput"
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {otpRef.map((ref, index) => (
                          <input
                            key={index}
                            id={"num" + (index + 1)}
                            ref={ref}
                            type="text"
                            onKeyUp={(e) => handleOtp(index, e)}
                            maxLength="1"
                          />
                        ))}
                      </div>
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
                      <LoadingButton
                        loading={isSubmitting || loading}
                        loadingPosition="start"
                        onClick={handleOtpSubmit}
                        startIcon={<VpnKeySharp />}
                        variant="contained"
                        size="large"
                      >
                        Verify Code
                      </LoadingButton>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Container>
        </>
      ) : (
        <>
          <Container
            maxWidth="xs"
            sx={{
              mt: 10,
            }}
          >
            <Stack
              mb={6}
              spacing={4}
              alignItems={"center"}
              textAlign={"center"}
            >
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
                  rememberMe: false,
                  mobileUser: false,
                }}
                validationSchema={Yup.object({
                  password: Yup.string()
                    .min(4, "Too Short!")
                    .max(50, "Too Long!")
                    .required("Required"),
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Required"),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    setLoading(true);
                    if (isLoggedInPage) {
                      const res = await users.loginUser(values);
                      if (res?.status === 200) {
                        secureLocalStorage.setItem(
                          "Me",
                          JSON.stringify(res?.data?.tokenData?.id)
                        );
                        Router.push("/boards");
                        Router.refresh();
                        setSubmitting(false);
                      }
                      resetForm();
                    } else {
                      if (!isXs) {
                        const res = await users.registerUser(values);
                        setIsVerifyPage(true);
                        setIsLoggedInPage(false);
                        setLoading(false);
                        toast.success(
                          "Otp has been sent to your mail address."
                        );
                        resetForm();
                      } else if (isXs) {
                        const res = await users.registerUser({
                          ...values,
                          mobileUser: true,
                        });
                        setIsLoggedInPage(true);
                        setLoading(false);
                        toast.success("User registered successfully!");
                      }
                      resetForm();
                    }
                  } catch (err) {
                    console.log("err:", err);
                    setLoading(false);
                    resetForm();
                    return toast.error(err?.response?.data?.error);
                  }
                }}
              >
                {({ handleChange, submitForm, isSubmitting }) => (
                  <Form>
                    <Stack
                      spacing={2}
                      alignItems={"center"}
                      textAlign={"center"}
                    >
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
                      {isLoggedInPage ? (
                        <label
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Checkbox
                            name="rememberMe"
                            label="Remember Me"
                            onChange={handleChange}
                            disabled={isSubmitting || loading}
                          />
                          Remember Me
                        </label>
                      ) : null}
                      <LoadingButton
                        loading={isSubmitting || loading}
                        loadingPosition="start"
                        onClick={submitForm}
                        startIcon={<LoginTwoTone />}
                        variant="contained"
                        size="large"
                      >
                        {isLoggedInPage ? "Login" : "Register"}
                      </LoadingButton>
                    </Stack>
                    <Typography
                      onClick={() => {
                        setIsLoggedInPage(!isLoggedInPage);
                      }}
                      sx={{
                        cursor: isSubmitting || loading ? "no-drop" : "pointer",
                      }}
                      textAlign={"center"}
                      mt={3}
                    >
                      {isLoggedInPage
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    </Typography>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
};

export default Login;
