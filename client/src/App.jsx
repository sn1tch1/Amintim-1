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
import FAQ from "./pages/FAQ";
import Memorial from "./pages/Memorial";
import TributePageSetup from "./pages/Tribute";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/privateRoutes";
import View from "./pages/View";
import Congratulations from "./pages/Congratulations";
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const location = useLocation();

  const navbarPaths = [
    "/",
    "/shop",
    "/aboutus",
    "/faq",
    "/contact",
    "/cart",
    "/checkout",
    "/manage-account/settings",
    "/login",
  ];
  const headerPaths = ["/tribute", "/verify"];

  const showNavbar = navbarPaths.includes(location.pathname);
  const showHeader = headerPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Captcha />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/profile/view/:id" element={<View />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/proceed"
          element={<PrivateRoute element={<Proceed />} />}
        />

        <Route
          path="/manage-account/settings"
          element={<PrivateRoute element={<Settings />} />}
        />
        <Route
          path="/memorial/profile/:id"
          element={<PrivateRoute element={<Memorial />} />}
        />
        <Route
          path="/qr/link"
          element={<PrivateRoute element={<QRLink />} />}
        />
        <Route
          path="/tribute"
          element={<PrivateRoute element={<TributePageSetup />} />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {showNavbar && <Footer />}
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
