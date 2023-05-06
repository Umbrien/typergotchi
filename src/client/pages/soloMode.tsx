import { useState } from "react";
import { SoloModeSession } from "../components/typer/SoloModeSession";
import type { generateTextProps } from "@wasp/shared/types";
import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";
import { IconAbc, IconClock } from "@tabler/icons-react";

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
                      {l.toString()}
                    </HeaderSelectBtn>
                  ))}
              </div>
            </div>
            <div className="text-md flex items-center gap-4">
              <div className="flex w-min gap-2">
                <span className="text-yellow-700">1:30</span>
                <span className="text-yellow-700">13/{text?.length}</span>
              </div>
              <span className="text-yellow-700">40 cpm</span>
            </div>
          </div>
        </div>
        <SoloModeSession text={text} />
      </div>
    </div>
  );
}
