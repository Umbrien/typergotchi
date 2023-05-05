import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";
import { Word } from "../components/typer/Word";

export function SoloMode() {
  const { data: text } = useQuery(
    generateText,
    {
      length: { words: 40 },
      includeCapitalLetters: true,
      includeNumbers: true,
      includePunctuationMarks: true,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!text) {
    return <div>No text yet</div>;
  }

  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="flex max-w-xl flex-col self-center rounded-xl bg-yellow-100">
        <div className="flex items-center justify-between p-3">
          <h1>🐝 Solo mode</h1>
          <div className="flex w-min gap-4">
            <span className="text-sm text-yellow-700">1:30</span>
            <span className="text-sm text-yellow-700">13/{text.length}</span>
          </div>
          <span className="text-sm text-yellow-700">40 wpm</span>
        </div>
        <div className="flex-start flex h-48 flex-wrap gap-2 rounded-xl bg-yellow-200 p-3">
          {text ? (
            text.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i}
                currentWordIndex={0}
                isCurrentWord={i === 0}
              />
            ))
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}
