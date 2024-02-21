"use client";

import { createTheme } from "@mui/material";

export const colors = [
  "#F49D6E",
  "#E85A4F",
  "#FFD166",
  "#8ABEB7",
  "#247BA0",
  "#D3D3D3",
];

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
      textTransform: "unset",
      // fontWeight: 600,
    },
    h6: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
