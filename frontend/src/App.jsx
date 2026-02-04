import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbarcomponent from "./components/Navbarcomponent";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbarcomponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
