import { useState, useRef, useEffect } from "react";
import { SoloModeSession } from "../components/typer/SoloModeSession";
import type { generateTextProps } from "@wasp/shared/types";
import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";
import useAuth from "@wasp/auth/useAuth";
import AddSoloPassing from "@wasp/actions/addSoloPassing";
import { IconAbc, IconClock } from "@tabler/icons-react";
import { useKeyPress } from "../hooks/useKeyPress";
import { useSessionStore } from "../store/store";
import { secondsPretty, secondsToTimeString } from "../utils/session";
import { Link } from "react-router-dom";

function HeaderSelectBtn({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded border-2 border-yellow-400 px-2 py-1 text-sm text-yellow-800 ${
        selected ? "bg-yellow-200" : "bg-transparent"
      }`}
    >
      {children}
    </button>
  );
}

const wordsLengths = [10, 50, 100, 200, 250];
const secondsLengths = [30, 60, 60 * 2, 60 * 5, 60 * 10];

export function SoloMode() {
  const { data: user } = useAuth();

  const [includeCapitalLetters, setIncludeCapitalLetters] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includePunctuationMarks, setIncludePunctuationMarks] = useState(false);
  const [length, setLength] = useState<generateTextProps["length"]>({
    words: 50,
  });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cpm, setCpm] = useState(0);

  const session = useSessionStore();

  const { data: text } = useQuery(
    generateText,
    {
      includeNumbers,
      includeCapitalLetters,
      includePunctuationMarks,
      length,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (text) {
      setSeconds(0);
      setCpm(0);
      clearInterval(interval.current);
      setIsSessionActive(false);
      session.finishSession();
      session.seedWordsWithText(text);
    }
  }, [text]);

  function handleLengthVariantSelection(
    lengthVariant: generateTextProps["length"]
  ) {
    if ("words" in length && "seconds" in lengthVariant) {
      setLength(lengthVariant);
    }
    if ("seconds" in length && "words" in lengthVariant) {
      setLength(lengthVariant);
    }
  }

  const { key, code, timeStamp } = useKeyPress();

  useEffect(() => {
    if (session.isSessionFinished) {
      setIsSessionActive(false);
      clearInterval(interval.current);

      if (user) {
        AddSoloPassing({ cpm });
      } else {
        alert("Please log in to save your results.");
      }
    }
  }, [session.isSessionFinished]);

  useEffect(() => {
    if (key && !session.isSessionFinished) {
      session.reactToKeyPress({ key, code });
      setIsSessionActive(true);
    }
  }, [timeStamp]);

  const interval = useRef<NodeJS.Timer>();
  useEffect(() => {
    if (isSessionActive) {
      interval.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      return () => clearInterval(interval.current);
    } else {
      setSeconds(0);
      setCpm(0);
    }
  }, [isSessionActive]);

  useEffect(() => {
    const cpm = Math.round((session.currentWordIndex / (seconds / 60)) * 100);
    setCpm(cpm);
  }, [session.currentWordIndex]);

  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="flex w-[56rem] flex-col self-center rounded-xl bg-yellow-100">
        <div className="flex items-center justify-between gap-8 p-3">
          <h1 className="whitespace-nowrap">🐝 Solo mode</h1>
          <div className="flex w-full justify-between">
            <div className="flex w-min items-center gap-2">
              <div className="flex w-min gap-2">
                <HeaderSelectBtn
                  selected={includeCapitalLetters}
                  onClick={() => setIncludeCapitalLetters((i) => !i)}
                >
                  Aa
                </HeaderSelectBtn>
                <HeaderSelectBtn
                  selected={includeNumbers}
                  onClick={() => setIncludeNumbers((i) => !i)}
                >
                  123
                </HeaderSelectBtn>
                <HeaderSelectBtn
                  selected={includePunctuationMarks}
                  onClick={() => setIncludePunctuationMarks((i) => !i)}
                >
                  !?
                </HeaderSelectBtn>
              </div>

              <div className="h-8 w-px bg-yellow-200" />

              <div className="flex w-min gap-2 rounded border border-yellow-300 p-2">
                <HeaderSelectBtn
                  selected={"words" in length}
                  onClick={() =>
                    handleLengthVariantSelection({
                      words: 50,
                    })
                  }
                >
                  <IconAbc className="" size={16} />
                </HeaderSelectBtn>
                <HeaderSelectBtn
                  selected={"seconds" in length}
                  onClick={() =>
                    handleLengthVariantSelection({
                      seconds: 60,
                    })
                  }
                >
                  <IconClock className="" size={16} />
                </HeaderSelectBtn>
                <div className="h-8 w-px bg-yellow-200" />
                {"words" in length &&
                  wordsLengths.map((l) => (
                    <HeaderSelectBtn
                      key={`length-words-${l}`}
                      selected={length.words === l}
                      onClick={() => setLength({ words: l })}
                    >
                      {l.toString()}
                    </HeaderSelectBtn>
                  ))}
                {"seconds" in length &&
                  secondsLengths.map((l) => (
                    <HeaderSelectBtn
                      key={`length-seconds-${l}`}
                      selected={length.seconds === l}
                      onClick={() => setLength({ seconds: l })}
                    >
                      {secondsPretty(l)}
                    </HeaderSelectBtn>
                  ))}
              </div>
            </div>
            <div className="text-md flex items-center gap-4">
              <div className="flex w-min gap-2">
                <span className="text-yellow-700">
                  {secondsToTimeString(seconds)}
                </span>
                <span className="text-yellow-700">
                  {session.currentWordIndex + 1}/{text?.length}
                </span>
              </div>
              <span className="text-yellow-700">{cpm || 0} cpm</span>
            </div>
          </div>
        </div>
        <SoloModeSession
          words={session.words}
          currentWordIndex={session.currentWordIndex}
        />
        {session.isSessionFinished && (
          <div>
            {user ? (
              "Results saved!"
            ) : (
              <p>
                Please{" "}
                <Link className="underline" to="/login">
                  log in
                </Link>{" "}
                to save your results
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
