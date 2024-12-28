import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { lightTheme } from "./utils/theme/light";
import { mainRoutes } from "./routes/Routes";
import "./App.css";

interface Route {
  pathName: string;
  element: JSX.Element;
}

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          {(mainRoutes as Route[]).map((route, index) => (
            <Route path={route.pathName} element={route.element} key={index} />
          ))}
        </Routes>
        <Toaster
          reverseOrder={false}
          position="bottom-center"
          containerStyle={{ fontFamily: "Poppins" }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
