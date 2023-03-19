import Document, { Head, Html, Main, NextScript } from "next/document";
import {
  ThemeProvider,
  Header,
  Logo,
  IconButton,
  HeaderRight,
} from "@ripe-ui/react";
import { FaGithub } from "react-icons/fa";

export default class _Document extends Document {
  render() {
    return (
      <ThemeProvider
        theme={{
          primaryColor: "rgba(243, 220, 81, 1)",
          secondaryColor: "red",
          fontFamily: "Nunito, sans-serif",
          bg: "#181818",
        }}
      >
        <Html>
          <Head />
          <body
            style={{
              margin: "0px",
              backgroundColor: "#181818",
              color: "white",
            }}
          >
            <Main />
            <NextScript />
          </body>
        </Html>
      </ThemeProvider>
    );
  }
}
