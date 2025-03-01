import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedAnswers,
    currentQuestionIndex,
    showResults,
    score,
    toggleAnswer,
    nextQuestion,
    resetQuiz,
    questions,
    scoreRanges,
    checkAnswer,
  } = useQuizStore();

  const [feedback, setFeedback] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Überprüfen");
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
  const [answeredState, setAnsweredState] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswers.size === 0) {
      setFeedback("Bitte wählen Sie mindestens eine Antwort aus.");
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return;
    }

    if (!answeredState) {
      checkAnswer(setFeedback);
      setButtonText("Weiter");
      setAnsweredState(true);
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    nextQuestion();
    setButtonText("Überprüfen");
    setAnsweredState(false);
    setAreButtonsDisabled(false);
    setFeedback(null);
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigate("/");
  };

  const getButtonColor = (optionIndex: number) => {
    if (!answeredState) return "";

    const isSelected = selectedAnswers.has(optionIndex);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctOptionIndexes.includes(optionIndex);

    if (isSelected && isCorrect) return "bg-green-100 border-green-500";
    if (isSelected && !isCorrect) return "bg-red-100 border-red-500";
    if (!isSelected && isCorrect) return "bg-green-100 border-green-500";
    return "";
  };

  const currentQuestion = questions[currentQuestionIndex];
  // Determine if the question is multiple choice (more than one correct answer)
  const isMultipleChoice = currentQuestion.correctOptionIndexes.length > 1;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              Frage {currentQuestionIndex + 1} von {questions.length}
            </CardTitle>
            <CardDescription>
              {isMultipleChoice
                ? "Wählen Sie alle zutreffenden Antworten aus."
                : "Wählen Sie eine Antwort aus."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg sm:text-xl font-medium mb-4">
              {currentQuestion.question}
            </h2>

            {isMultipleChoice ? (
              <div className="space-y-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-3 p-3 rounded-md border ${getButtonColor(optionIndex)}`}
                  >
                    <Checkbox
                      id={`option-${optionIndex}`}
                      checked={selectedAnswers.has(optionIndex)}
                      onCheckedChange={() => !answeredState && toggleAnswer(optionIndex)}
                      disabled={answeredState}
                    />
                    <label
                      htmlFor={`option-${optionIndex}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswers.size > 0 ? Array.from(selectedAnswers)[0].toString() : undefined}
                onValueChange={(value) => !answeredState && toggleAnswer(parseInt(value))}
                className="space-y-3"
                disabled={answeredState}
              >
                {currentQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-3 p-3 rounded-md border ${getButtonColor(optionIndex)}`}
                  >
                    <RadioGroupItem
                      value={optionIndex.toString()}
                      id={`option-${optionIndex}`}
                      disabled={answeredState}
                    />
                    <label
                      htmlFor={`option-${optionIndex}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {feedback && (
              <div className={`mt-4 p-3 rounded-md font-medium ${
                feedback === "Richtig!"
                  ? "bg-green-100 text-green-700"
                  : feedback === "Teilweise richtig!"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}>
                {feedback}
              </div>
            )}

            {answeredState && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">Erklärung:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBackToHome}
              className="mr-2"
            >
              Abbrechen
            </Button>
            <Button onClick={handleSubmit}>
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Quiz abgeschlossen!
              </CardTitle>
              <CardDescription className="text-center">
                Sie haben {score} von {questions.length} Fragen richtig beantwortet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-lg">
                  {scoreRanges.find(
                    (range) =>
                      score >= range.minScore && score <= range.maxScore
                  )?.message || "Danke für Ihre Teilnahme!"}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h3 className="font-medium text-blue-800 mb-2">
                  Was haben Sie gelernt?
                </h3>
                <p>
                  Dieses Quiz sollte Ihnen helfen, die verschiedenen Manipulationstechniken
                  in sozialen Medien zu erkennen. Je mehr Sie über diese Techniken wissen,
                  desto besser können Sie sich davor schützen.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleBackToHome} className="mr-2">
                Zurück zur Startseite
              </Button>
              <Button variant="outline" onClick={resetQuiz}>
                Quiz neu starten
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default QuizPage;
