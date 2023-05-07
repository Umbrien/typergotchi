import { create } from "zustand";
import { LetterState } from "../types/session";
import { isKeyNonTypeable } from "../utils/session";

export type SessionState = {
  currentWordIndex: number;
  currentLetterIndex: number;
  isSessionFinished: boolean;
  words: {
    word: string;
    letterStatuses: {
      letter: string;
      status: LetterState;
    }[];
  }[];
  seedWordsWithText: (text: string[]) => void;
  nextWord: () => void;
  nextLetter: () => void;
  prevWord: () => void;
  prevLetter: () => void;
  reactToKeyPress: ({ key, code }: { key: string; code: string }) => void;
  finishSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  words: [],
  currentWordIndex: 0,
  currentLetterIndex: 0,
  isSessionFinished: false,
  seedWordsWithText: (text: string[]) => {
    const words = text.map((word) => {
      const letterStatuses = word.split("").map((letter) => ({
        letter,
        status: "not-typed" as LetterState,
      }));
      return { word, letterStatuses };
    });
    set({
      words,
      currentWordIndex: 0,
      currentLetterIndex: 0,
      isSessionFinished: false,
    });
  },
  nextWord: () =>
    set((state) => {
      state.currentWordIndex = state.currentWordIndex + 1;
      state.currentLetterIndex = 0;

      // set first letter of next word to current
      const nextWord = state.words[state.currentWordIndex];
      const nextLetter = nextWord.letterStatuses[0];
      nextLetter.status = "current";
      return {
        ...state,
      };
    }),
  nextLetter: () =>
    set((state) => {
      if (
        state.currentLetterIndex ===
        state.words[state.currentWordIndex].letterStatuses.length - 1
      ) {
        return { ...state };
      }

      const nextLetterIndex = state.currentLetterIndex + 1;
      const nextLetter =
        state.words[state.currentWordIndex].letterStatuses[nextLetterIndex];
      nextLetter.status = "current";

      state.currentLetterIndex = nextLetterIndex;
      return {
        ...state,
      };
    }),

  prevWord: () =>
    set((state) => {
      const prevWordIndex = state.currentWordIndex - 1;
      const prevWord = state.words[prevWordIndex];
      // clear current letter
      const currentLetter =
        state.words[state.currentWordIndex].letterStatuses[
          state.currentLetterIndex
        ];
      currentLetter.status = "not-typed";
      const prevLetter =
        prevWord.letterStatuses[prevWord.letterStatuses.length - 1];
      prevLetter.status = "current";
      state.currentWordIndex = prevWordIndex;
      state.currentLetterIndex = prevWord.letterStatuses.length - 1;
      return {
        ...state,
      };
    }),

  prevLetter: () => {
    set((state) => {
      if (state.currentLetterIndex === 0) {
        return { ...state };
      }

      // clear current letter
      const currentLetter =
        state.words[state.currentWordIndex].letterStatuses[
          state.currentLetterIndex
        ];
      currentLetter.status = "not-typed";

      // set previous letter to current
      const prevLetterIndex = state.currentLetterIndex - 1;
      const prevLetter =
        state.words[state.currentWordIndex].letterStatuses[prevLetterIndex];
      prevLetter.status = "current";

      state.currentLetterIndex = prevLetterIndex;

      return {
        ...state,
      };
    });
  },
  reactToKeyPress: ({ key, code }) => {
    if (isKeyNonTypeable(key)) return;

    set((state) => {
      const currentWord = state.words[state.currentWordIndex];
      const currentLetter =
        currentWord.letterStatuses[state.currentLetterIndex];

      if (key === "Backspace") {
        if (state.currentLetterIndex === 0 && state.currentWordIndex > 0) {
          state.prevWord();
          return { ...state };
        }
        state.prevLetter();
        return { ...state };
      }

      if (
        code === "Space" &&
        state.currentLetterIndex === currentWord.word.length - 1
      ) {
        state.nextWord();
        return { ...state };
      }

      const nextLetterIndex = state.currentLetterIndex + 1;
      const nextLetter = currentWord.letterStatuses[nextLetterIndex];

      if (currentLetter.letter === key) {
        currentLetter.status = "correct";
      } else {
        currentLetter.status = "incorrect";
      }
      if (nextLetter) {
        state.nextLetter();
      }

      const nextWordExists = !!state.words[state.currentWordIndex + 1];
      if (!nextWordExists && !nextLetter) {
        state.isSessionFinished = true;
      }

      return { ...state };
    });
  },
  finishSession: () => {
    set((state) => {
      state.isSessionFinished = true;
      return { ...state };
    });
  },
}));
