import { create } from "zustand";
import quizQuestions from "../data/quizQuestions.json";

interface QuizState {
  selectedAnswers: Set<number>;
  currentQuestionIndex: number;
  showResults: boolean;
  score: number;
  questions: typeof quizQuestions.questions;
  scoreRanges: typeof quizQuestions.scoreRanges;
  toggleAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  checkAnswer: (setFeedback: (message: string) => void) => void;
  resetQuiz: () => void;
}

const useQuizStore = create<QuizState>((set) => ({
  selectedAnswers: new Set<number>(),
  currentQuestionIndex: 0,
  showResults: false,
  score: 0,
  questions: quizQuestions.questions,
  scoreRanges: quizQuestions.scoreRanges,
  toggleAnswer: (optionIndex: number) =>
    set((state) => {
      const newSelectedAnswers = new Set(state.selectedAnswers);
      if (newSelectedAnswers.has(optionIndex)) {
        newSelectedAnswers.delete(optionIndex);
      } else {
        newSelectedAnswers.add(optionIndex);
      }
      return { selectedAnswers: newSelectedAnswers };
    }),
  nextQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          selectedAnswers: new Set<number>(),
        };
      } else {
        return { showResults: true };
      }
    }),
  checkAnswer: (setFeedback: (message: string) => void) =>
    set((state) => {
      const correctAnswers =
        state.questions[state.currentQuestionIndex].correctOptionIndexes;
      const userAnswers = Array.from(state.selectedAnswers);
      if (
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((ans) => userAnswers.includes(ans))
      ) {
        setFeedback("Richtig!");
        return { score: state.score + 1 };
      } else {
        setFeedback("Falsch!");
      }
      return {};
    }),
  resetQuiz: () =>
    set(() => ({
      selectedAnswers: new Set<number>(),
      currentQuestionIndex: 0,
      showResults: false,
      score: 0,
    })),
}));

export default useQuizStore;
