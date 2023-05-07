import type { LetterState } from "../../types/session";

type LetterProps = {
  letter: string;
  isCurrentLetter: boolean;
  state: LetterState;
};

const Letter = ({ letter, isCurrentLetter, state }: LetterProps) => {
  function getLetterColor(state: LetterState) {
    switch (state) {
      case "correct":
        return "text-green-500";
      case "incorrect":
        return "text-red-500";
      case "not-typed":
        return "text-gray-500";
    }
  }
  return (
    <span
      className={`inline-block ${
        isCurrentLetter && "animate-pulse"
      } ${getLetterColor(state)}`}
    >
      {letter}
    </span>
  );
};

type WordProps = {
  word: string;
  index: number;
  currentWordIndex: number;
  isCurrentWord: boolean;
};

export const Word = ({
  word,
  index,
  currentWordIndex,
  isCurrentWord,
}: WordProps) => {
  return (
    <span className={`text-xl ${isCurrentWord ? "bg-yellow-300" : ""}`}>
      {word.split("").map((letter, i) => (
        <Letter
          key={i}
          letter={letter}
          isCurrentLetter={isCurrentWord}
          state="not-typed"
        />
      ))}
    </span>
  );
};
