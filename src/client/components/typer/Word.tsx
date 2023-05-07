import type { LetterState } from "../../types/session";
import type { SessionState } from "../../store/store";

type LetterProps = {
  letter: string;
  isCurrentLetter: boolean;
  state: LetterState;
};

const Letter = ({ letter, state }: LetterProps) => {
  function getLetterColor(state: LetterState) {
    switch (state) {
      case "correct":
        return "text-yellow-900 border-yellow-200";
      case "current":
        return "text-yellow-600 border-yellow-600";
      case "incorrect":
        return "text-red-600 border-yellow-200 underline";
      case "not-typed":
        return "text-yellow-600 border-yellow-200";
    }
  }
  return (
    <span
      className={`inline-block border-l ${
        state === "current" && "animate-pulse"
      } ${getLetterColor(state)}`}
    >
      {letter}
    </span>
  );
};

type WordProps = {
  word: SessionState["words"][0];
  isCurrentWord: boolean;
};

export const Word = ({ word, isCurrentWord }: WordProps) => {
  return (
    <span
      className={`text-md font-mono tracking-tight decoration-red-600 ${
        isCurrentWord ? "" : ""
      }`}
    >
      {word.letterStatuses.map(({ letter, status }, i) => (
        <Letter
          key={i}
          letter={letter}
          isCurrentLetter={isCurrentWord}
          state={status}
        />
      ))}
    </span>
  );
};
