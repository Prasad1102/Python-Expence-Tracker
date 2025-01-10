// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routes from "./routes";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {routes.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AddExpence from "./Components/Expence/AddExpence";
import UpdateExpence from "./Components/Expence/UpdateExpence";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddExpence />} />
        <Route path="/update-expense/:id" element={<UpdateExpence />} />
      </Routes>
    </Router>
  );
};

export default App;
