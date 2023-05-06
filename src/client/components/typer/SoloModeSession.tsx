import { Word } from "./Word";

const wordsPerBlock = 50;

export function SoloModeSession({
  text,
  currentWordIndex,
}: {
  text?: string[];
  currentWordIndex: number;
}) {
  const blockStart =
    Math.floor(currentWordIndex / wordsPerBlock) * wordsPerBlock;
  const blockEnd = blockStart + wordsPerBlock;

  return (
    <div className="flex-start flex h-48 flex-wrap items-start gap-2 rounded-xl bg-yellow-200 p-3">
      {text ? (
        text
          .slice(blockStart, blockEnd)
          .map((word, i) => (
            <Word
              key={i}
              word={word}
              index={i}
              currentWordIndex={currentWordIndex}
              isCurrentWord={blockStart + i === currentWordIndex}
            />
          ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
