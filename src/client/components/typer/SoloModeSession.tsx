import { Word } from "./Word";
import type { SessionState } from "../../store/store";

const wordsPerBlock = 50;

export function SoloModeSession({
  words,
  currentWordIndex,
}: {
  words: SessionState["words"];
  currentWordIndex: number;
}) {
  const blockStart =
    Math.floor(currentWordIndex / wordsPerBlock) * wordsPerBlock;
  const blockEnd = blockStart + wordsPerBlock;

  return (
    <div className="flex-start flex h-48 flex-wrap items-start gap-2 rounded-xl bg-yellow-200 p-3">
      {words.length > 0 ? (
        words
          .slice(blockStart, blockEnd)
          .map((word, i) => (
            <Word
              key={i}
              word={word}
              isCurrentWord={blockStart + i === currentWordIndex}
            />
          ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
