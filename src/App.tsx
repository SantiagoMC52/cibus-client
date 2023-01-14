import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Signin from "./components/screens/Signin";
import "./styles/global.css";

import RootLayout from "./components/layouts/Layout";
import Profile from "./components/screens/Profile";

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
        <Route path="/profile" element={<Profile />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
