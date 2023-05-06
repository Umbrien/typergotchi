import { Word } from "./Word";

export function SoloModeSession({ text }: { text?: string[] }) {
  return (
    <div className="flex-start flex h-48 flex-wrap items-start gap-2 rounded-xl bg-yellow-200 p-3">
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
  );
}
