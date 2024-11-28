import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg_landingpage.png";

const LandingPage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-md max-w-sm mx-auto md:max-w-xl lg:max-w-2xl text-center overflow-y-auto max-h-[75vh]">
        <h1 className="text-2xl sm:text-5xl font-bold mb-2 sm:mb-4">
          Willkommen zu Soziale Medien Geheimnisse
        </h1>
        <h2 className="sm:text-2xl mb-4">
          Entdecken Sie, wie soziale Medien Ihre Wahrnehmung beeinflussen
          können!
        </h2>
        <p className="text-center text-xs sm:text-lg mb-6">
          Soziale Medien beeinflussen unseren Alltag mehr als wir denken. Hinter
          den scheinbar zufälligen Inhalten in Ihrem Feed stecken ausgeklügelte
          Algorithmen und Strategien. "Soziale Medien Geheimnisse" enthüllt
          diese verborgenen Mechanismen und zeigt Ihnen, wie Ihre
          Online-Erfahrung gezielt beeinflusst wird. Tauchen Sie ein in die Welt
          der Personalisierung und Manipulation – und lernen Sie, wie Sie sich
          schützen können.
        </p>
        <div className="flex-1 space-x-4">
          <Link
            to="/info"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Mehr erfahren
          </Link>
          <Link
            to="/quiz"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Quiz starten
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-6">
          Diese App ist im Rahmen einer Projektarbeit des Kurses
          Marketing-Fallstudien an der Friedrich-Alexander-Universität
          Erlangen-Nürnberg entstanden.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
