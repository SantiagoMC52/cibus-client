import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import RootLayout from "./components/layouts/Layout";
import ProtectedRoutes from "./components/screens/Auth/ProtectedRoutes";
import "./styles/global.css";
import Restaurants from "./components/screens/Restaurants";

const Root = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoutes>
              <Restaurants />
            </ProtectedRoutes>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
