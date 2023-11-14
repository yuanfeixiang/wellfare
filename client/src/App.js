import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// basic
import Header from "./components/base/header";
import Footer from "./components/base/footer";

// main service
import Home from "./components/home/index";
import Service from "./components/service/index";
import EachService from "./components/service/eachService";
import Map from "./components/map/index";
import Favorite from "./components/favorite/index";

// error
import Error404 from "./components/error404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/eachService/:servId" element={<EachService />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
