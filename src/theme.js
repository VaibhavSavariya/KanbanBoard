"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1D1F26",
    },
    primary: {
      main: "#BEA4FF",
    },
  },
  typography: {
    button: {
      // textTransform: "unset",
      // fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
