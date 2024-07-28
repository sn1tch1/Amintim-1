import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Captcha from "./pages/Captcha";
import Settings from "./pages/Settings";
import QRLink from "./pages/QRLink";
import Proceed from "./pages/Proceed";
import Memorial from "./pages/Memorial";
import TributePageSetup from "./pages/Tribute";
import Checkout from "./pages/Checkout";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/verify";
  const isProfilePage = location.pathname === "/memorial/profile";

  return (
    <>
      {!isProfilePage && !isLoginPage && <Navbar />}
      {!isProfilePage && isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Captcha />} />
        <Route path="/proceed" element={<Proceed />} />
        <Route path="/manage-account/settings" element={<Settings />} />
        <Route path="/memorial/profile" element={<Memorial />} />
        <Route path="/qr/link" element={<QRLink />} />
        <Route path="/tribute" element={<TributePageSetup />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {!isProfilePage && !isLoginPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
