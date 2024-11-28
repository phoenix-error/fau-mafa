import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";

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

  const handleSubmit = () => {
    if (selectedAnswers.size === 0) {
      setFeedback("Bitte wählen Sie mindestens eine Antwort aus.");
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      return;
    }
    checkAnswer(setFeedback);
    setTimeout(() => {
      setFeedback(null);
      nextQuestion();
    }, 2000);
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        {!showResults ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {questions[currentQuestionIndex].question}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              (Mehrfachauswahl möglich)
            </p>
            <div className="space-y-2">
              {questions[currentQuestionIndex].options.map((option, oIndex) => (
                <motion.button
                  key={oIndex}
                  className={`w-full text-left p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedAnswers.has(oIndex)
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                  onClick={() => toggleAnswer(oIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {feedback && (
              <motion.div
                className={`mt-4 p-4 rounded text-center ${
                  feedback === "Richtig!"
                    ? "bg-green-200 text-green-800"
                    : feedback === "Falsch!"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {feedback}
                {feedback !==
                  "Bitte wählen Sie mindestens eine Antwort aus." && (
                  <p className="mt-2">
                    {questions[currentQuestionIndex].explanation}
                  </p>
                )}
              </motion.div>
            )}
            <motion.button
              onClick={handleSubmit}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full w-full hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Überprüfen
            </motion.button>
          </motion.div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Ihr Ergebnis: {score}
            </h2>
            {scoreRanges.map(
              (
                range: { minScore: number; maxScore: number; message: string },
                index: number
              ) =>
                score >= range.minScore && score <= range.maxScore ? (
                  <p key={index} className="text-lg text-center">
                    {range.message}
                  </p>
                ) : null
            )}
            <button
              onClick={handleBackToHome}
              className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-full w-full hover:bg-gray-700"
            >
              Zurück zur Startseite
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
