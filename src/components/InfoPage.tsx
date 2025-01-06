import React, { useState } from "react";
import infoPageData from "../data/infoPageData.json";

interface Technique {
  title: string;
  image: string;
  shortDescription: string;
  detailedDescription: string;
  solutions: string[];
  additionalResources?: { title: string; link: string }[];
}

const InfoPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [overlayContent, setOverlayContent] = useState<Technique | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const openOverlay = (technique: Technique) => {
    setOverlayContent(technique);
  };

  const closeOverlay = () => {
    setOverlayContent(null);
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {overlayContent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto"
            onClick={closeOverlay}
          >
            <div
              className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl my-auto md:my-8 min-h-[calc(100vh-2rem)] md:min-h-0 md:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
                <h3 className="text-2xl font-bold">{overlayContent.title}</h3>
                <button
                  className="text-black text-3xl hover:text-gray-700"
                  onClick={closeOverlay}
                >
                  &times;
                </button>
              </div>
              <div className="p-4 md:p-8 pb-16 md:pb-8">
                <img
                  src={require(`../assets/images/${overlayContent.image}`)}
                  alt={overlayContent.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <p className="text-gray-700 mb-4">
                  {overlayContent.detailedDescription}
                </p>
                <ul className="list-disc pl-5">
                  {overlayContent.solutions.map((solution, i) => (
                    <li key={i} className="text-green-700 mb-2">
                      {solution}
                    </li>
                  ))}
                </ul>
                {overlayContent.additionalResources && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Zusätzliche Ressourcen:
                    </h3>
                    <ul className="space-y-2">
                      {overlayContent.additionalResources.map(
                        (resource, index) => (
                          <li key={index} className="flex items-center">
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {resource.title}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="max-w-6xl w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoPageData.slice(0, 3).map((technique, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md mb-4 p-6 cursor-pointer transform transition-transform duration-300 ${
                  expanded === index ? "scale-105" : ""
                }`}
                onClick={() => {
                  if (expanded === index) {
                    toggleExpand(index);
                  } else {
                    openOverlay(technique);
                  }
                }}
              >
                <img
                  src={require(`../assets/images/${technique.image}`)}
                  alt={technique.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mb-2 mt-4">
                  {technique.title}
                </h3>
                <p className="text-gray-700 mb-2">
                  {technique.shortDescription}
                </p>
                {expanded === index && (
                  <div className="mt-4">
                    <p className="text-gray-700 mb-4">
                      {technique.detailedDescription}
                    </p>
                    <ul className="list-disc pl-5">
                      {technique.solutions.map((solution, i) => (
                        <li key={i} className="text-green-700 mb-2">
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {infoPageData.slice(3).map((technique, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md mb-4 p-6 cursor-pointer transform transition-transform duration-300 ${
                  expanded === index + 3 ? "scale-105" : ""
                }`}
                onClick={() => {
                  if (expanded === index + 3) {
                    toggleExpand(index + 3);
                  } else {
                    openOverlay(technique);
                  }
                }}
              >
                <img
                  src={require(`../assets/images/${technique.image}`)}
                  alt={technique.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mb-2 mt-4">
                  {technique.title}
                </h3>
                <p className="text-gray-700 mb-2">
                  {technique.shortDescription}
                </p>
                {expanded === index + 3 && (
                  <div className="mt-4">
                    <p className="text-gray-700 mb-4">
                      {technique.detailedDescription}
                    </p>
                    <ul className="list-disc pl-5">
                      {technique.solutions.map((solution, i) => (
                        <li key={i} className="text-green-700 mb-2">
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
