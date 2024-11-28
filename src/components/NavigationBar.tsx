import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return showNavBar ? (
    <div className="p-4">
      <div className="bg-white text-gray-800 p-4 shadow-md rounded-xl">
        <nav className="relative flex items-center justify-center">
          <Link to="/" className="absolute left-0 text-lg font-semibold">
            &larr; Zurück
          </Link>
          <span className="text-lg font-medium">
            {location.pathname === "/info"
              ? "Informationen"
              : "Machen Sie das Quiz"}
          </span>
        </nav>
      </div>
    </div>
  ) : null;
};

export default NavigationBar;
