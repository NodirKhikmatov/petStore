import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import { BrowserRouter } from "react-router-dom";
import "../src/css/index.css";
import ContextProvider from "./app/Context/ContextProvider";

// Define the props type for Router
type RouterProps = {
  children: React.ReactNode;
};

// Use RouterProps to explicitly define the props
const Router: React.FC<RouterProps> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default Router;

// Root rendering using React 18's createRoot
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// For performance measurements (optional)
reportWebVitals();
