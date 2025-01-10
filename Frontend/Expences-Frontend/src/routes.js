import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
