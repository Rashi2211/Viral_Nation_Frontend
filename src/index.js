import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
//import { AuthProvider } from './context/authContext';

// ReactDOM.createRoot for concurrent mode rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
// Rendering the entire app inside the ApolloProvider and BrowserRouter
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        {/* Rendering main App component */}
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
);
reportWebVitals();
