import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InfoPage from "./components/InfoPage";
import LandingPage from "./components/LandingPage";
import NavigationBar from "./components/NavigationBar";
import QuizPage from "./components/QuizPage";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
