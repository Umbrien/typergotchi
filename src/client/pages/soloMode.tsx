import { useQuery } from "@wasp/queries";
import generateText from "@wasp/queries/generateText";

export function SoloMode() {
  const { data: text } = useQuery(generateText, { length: { words: 10 } });

  if (!text) {
    return <div>No text yet</div>;
  }

  return (
    <div>
      <h1>Text generated by the server:</h1>
      <p>{text.join(" ")}</p>
    </div>
  );
}