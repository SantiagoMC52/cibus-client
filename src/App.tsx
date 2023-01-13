import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/signin">SIGIN</Link>
      </div>
      <div>
        <Outlet />
      </div>
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
