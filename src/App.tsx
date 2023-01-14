import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";
import "./styles/global.css";
import { Box } from "@mui/material";
import Navbar from "./components/Header";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/signin" && <Navbar />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f7f8fb",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
