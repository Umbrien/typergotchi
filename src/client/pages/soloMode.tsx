import { useState } from "react";
import { SoloModeSession } from "../components/typer/SoloModeSession";
import type { generateTextProps } from "@wasp/shared/types";
import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";

function HeaderSelectBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
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
      {label}
    </button>
  );
}

const wordsLengths = [10, 50, 100, 150, 200, 250];
const secondsLengths = [30, 60, 60 * 2, 60 * 5];

export function SoloMode() {
  const [includeCapitalLetters, setIncludeCapitalLetters] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includePunctuationMarks, setIncludePunctuationMarks] = useState(false);
  const [length, setLength] = useState<generateTextProps["length"]>({
    words: 50,
  });
  const [sessionStarted, setSessionStarted] = useState(false);

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
  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="flex w-[56rem] flex-col self-center rounded-xl bg-yellow-100">
        <div className="flex items-center justify-between p-3">
          <h1>🐝 Solo mode</h1>
          <div className="flex w-min gap-2">
            <HeaderSelectBtn
              label="Aa"
              selected={includeCapitalLetters}
              onClick={() => setIncludeCapitalLetters((i) => !i)}
            />
            <HeaderSelectBtn
              label="123"
              selected={includeNumbers}
              onClick={() => setIncludeNumbers((i) => !i)}
            />
            <HeaderSelectBtn
              label="!?"
              selected={includePunctuationMarks}
              onClick={() => setIncludePunctuationMarks((i) => !i)}
            />
          </div>

          <div className="h-8 w-px bg-yellow-200" />

          <div className="flex w-min gap-2">
            {"words" in length &&
              wordsLengths.map((l) => (
                <HeaderSelectBtn
                  key={`length-words-${l}`}
                  label={l.toString()}
                  selected={length.words === l}
                  onClick={() => setLength({ words: l })}
                />
              ))}
            {"seconds" in length &&
              secondsLengths.map((l) => (
                <HeaderSelectBtn
                  key={`length-seconds-${l}`}
                  label={l.toString()}
                  selected={length.seconds === l}
                  onClick={() => setLength({ seconds: l })}
                />
              ))}
          </div>
          <div className="flex w-min gap-2">
            <span className="text-sm text-yellow-700">1:30</span>
            <span className="text-sm text-yellow-700">13/{text?.length}</span>
          </div>
          <span className="text-sm text-yellow-700">40 cpm</span>
        </div>
        <SoloModeSession text={text} />
      </div>
    </div>
  );
}
