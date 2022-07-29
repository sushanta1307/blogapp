import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from './components/About';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ScrollToTop from "react-scroll-to-top";
import SignUp from './components/SignUp';
import { FaAngleUp } from "react-icons/fa";

import Home from './components/Home';
import { CookieContext } from "./context/CookieContext";

function App() {

  return (
    <Router>
      <CookieContext>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/signup" element={<SignUp />} />
        <Route exact path="/blogs" element={<Blog />} />
      </Routes>
      <Footer />
      <ScrollToTop smooth component={<FaAngleUp />} />
      </CookieContext>
    </Router>
  );
}

export default App;
