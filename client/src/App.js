import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// basic
// import Footer from "./components/base/footer";
import Header from "./components/base/header";

// main service
import Home from "./components/home/home";
import Service from "./components/service/service";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service" element={<Service />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
