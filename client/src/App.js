import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// basic
// import Footer from "./components/base/footer";
import Header from "./components/base/header";

// main service
import Home from "./components/home/home";
import Service from "./components/service/service";
import Map from "./components/service/map";
import Favorite from "./components/service/favorite";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
