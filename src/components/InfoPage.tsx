import React, { useState } from "react";
import infoPageData from "../data/infoPageData.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { X } from "lucide-react";

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

  // Ensure infoPageData is treated as an array of Technique objects
  const techniques = Array.isArray(infoPageData) ? infoPageData : [];

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto px-0 sm:px-4 md:px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Manipulationstechniken in sozialen Medien
          </h1>
          <p className="text-muted-foreground">
            Erfahren Sie mehr über die verschiedenen Techniken, die in sozialen Medien eingesetzt werden
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techniques.map((technique, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={require(`../assets/images/${technique.image}`)}
                  alt={technique.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{technique.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {technique.shortDescription}
                </p>
                <Button
                  onClick={() => openOverlay(technique)}
                  variant="secondary"
                  className="w-full"
                >
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {overlayContent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeOverlay}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="relative">
              <Button
                onClick={closeOverlay}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle>{overlayContent.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-md overflow-hidden">
                <img
                  src={require(`../assets/images/${overlayContent.image}`)}
                  alt={overlayContent.title}
                  className="w-full max-h-[300px] object-contain mx-auto"
                />
              </div>

              <div className="space-y-6">
                {/* Description Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Beschreibung</h3>
                  <div className="prose prose-sm max-w-none">
                    <p>{overlayContent.detailedDescription}</p>
                  </div>
                </div>

                {/* Solutions Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Lösungen</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {overlayContent.solutions.map((solution, idx) => (
                      <li key={idx}>{solution}</li>
                    ))}
                  </ul>
                </div>

                {/* Resources Section - Only shown if resources exist */}
                {overlayContent.additionalResources && overlayContent.additionalResources.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Ressourcen</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {overlayContent.additionalResources.map((resource, idx) => (
                        <li key={idx}>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={closeOverlay} className="w-full">Schließen</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
