import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";

export function SoloMode() {
  const { data: text } = useQuery(generateText, {
    length: { words: 10 },
  });

  if (!text) {
    return <div>No text yet</div>;
  }

  return (
    <div className="flex flex-col bg-green-400">
      <div className="flex max-w-xl flex-col self-center bg-green-600">
        <div className="flex justify-between">
          <h1>🐝 Solo mode</h1>
          <span>40 wpm</span>
        </div>
        <div className="w-[48rem]">
          <p>{text.join(" ")}</p>
        </div>
      </div>
    </div>
  );
}
