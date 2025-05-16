import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./pages/500/ErrorPage.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage} resetKeys={[location.pathname]}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
