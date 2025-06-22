import "../src/css/index.css";

import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import ContextProvider from "./app/Context/ContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
// import {SocketProvider} from "./app/Context/SocketContext";
import {ThemeProvider} from "@mui/material/styles";
import reportWebVitals from "./reportWebVitals";
import {store} from "./app/store";
import theme from "./app/MaterialTheme";

// Define the props type for Router
type RouterProps = {
  children: React.ReactNode;
};

// Use RouterProps to explicitly define the props
const Router: React.FC<RouterProps> = ({children}) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default Router;

// Root rendering using React 18's createRoot
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        {/* <SocketProvider> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
        {/* </SocketProvider> */}
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// For performance measurements (optional)
reportWebVitals();
