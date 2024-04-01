import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { CookieProvider } from "./context/auth.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CookieProvider>
          <App />
        </CookieProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
