import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../ClientPanel/pages/Home";
import Login from "../ClientPanel/pages/Login";
import Contact from "../ClientPanel/pages/Contact";
import About from "../ClientPanel/pages/About";
import Navbar from "../ClientPanel/components/Navbar";
import Header from "../ClientPanel/components/Header";
import Cart from "../ClientPanel/pages/Cart";
import Footer from "../ClientPanel/components/Footer";
import Shop from "../ClientPanel/pages/Shop";
import Captcha from "../ClientPanel/pages/Captcha";
import Settings from "../ClientPanel/pages/Settings";
import QRLink from "../ClientPanel/pages/QRLink";
import Proceed from "../ClientPanel/pages/Proceed";
import FAQ from "../ClientPanel/pages/FAQ";
import Memorial from "../ClientPanel/pages/Memorial";
import TributePageSetup from "../ClientPanel/pages/Tribute";
import Checkout from "../ClientPanel/pages/Checkout";
import PrivateRoute from "../ClientPanel/components/privateRoutes";
import View from "../ClientPanel/pages/View";
import Congratulations from "../ClientPanel/pages/Congratulations";
import TermsAndConditions from "../ClientPanel/pages/TermsAndConditions";
import CookiePolicy from "../ClientPanel/pages/CookiePolicy";
import PrivacyPolicy from "../ClientPanel/pages/PrivacyPolicy";
import NotFound from "../ClientPanel/pages/NotFound";

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
    <div>
      <AppContent />
    </div>
  );
}

export default App;
