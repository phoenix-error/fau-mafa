import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return showNavBar ? (
    <div className="p-4">
      <Card>
        <CardContent className="p-4">
          <nav className="relative flex items-center justify-center">
            <Link to="/" className="absolute left-0">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Zurück</span>
              </Button>
            </Link>
            <span className="text-lg font-medium">
              {location.pathname === "/info"
                ? "Informationen"
                : "Machen Sie das Quiz"}
            </span>
          </nav>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default NavigationBar;
