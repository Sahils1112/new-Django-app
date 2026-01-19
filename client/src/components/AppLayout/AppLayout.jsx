// AppLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const AppLayout = ({ numCartItems }) => {
  // use the same variable name you'll reference
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(curr => !curr);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-[#ffffff] dark:bg-[#181A2A] min-h-screen">
        <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} numCartItems={numCartItems}/>
        {/* <ToastContainer /> */}
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
