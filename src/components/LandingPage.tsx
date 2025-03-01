import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg_landingpage.png";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Card className="max-w-sm mx-auto md:max-w-xl lg:max-w-2xl bg-white/90 backdrop-blur-sm overflow-y-auto max-h-[75vh]">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-5xl text-center">
            Willkommen zu Soziale Medien Geheimnisse
          </CardTitle>
          <CardDescription className="sm:text-2xl text-center">
            Entdecken Sie, wie soziale Medien Ihre Wahrnehmung beeinflussen
            können!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-xs sm:text-lg mb-6">
            Soziale Medien beeinflussen unseren Alltag mehr als wir denken. Hinter
            den scheinbar zufälligen Inhalten in Ihrem Feed stecken ausgeklügelte
            Algorithmen und Strategien. "Soziale Medien Geheimnisse" enthüllt
            diese verborgenen Mechanismen und zeigt Ihnen, wie Ihre
            Online-Erfahrung gezielt beeinflusst wird. Tauchen Sie ein in die Welt
            der Personalisierung und Manipulation – und lernen Sie, wie Sie sich
            schützen können.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="default">
              <Link to="/info">Mehr erfahren</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/quiz">Quiz starten</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs sm:text-sm text-muted-foreground text-center w-full">
            Diese App ist im Rahmen einer Projektarbeit des Kurses
            Marketing-Fallstudien an der Friedrich-Alexander-Universität
            Erlangen-Nürnberg entstanden.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;
