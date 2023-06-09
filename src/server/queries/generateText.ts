import { wordList } from "../wordList.js";
// @ts-ignore
import { prng_alea } from "esm-seedrandom";
import type { generateTextProps } from "@wasp/shared/types.js";

const punctuationMarks = [".", ",", ":", ";", "!", "?"];
const chanceOfNumber = 1 / 12;
const chanceOfCapital = 1 / 15;
const chanceOfPunctuation = 1 / 8;
const wordsPerSecond = 4.2;
const maxNumber = 9999;

export function generateText({
  includeNumbers = false,
  includeCapitalLetters = false,
  includePunctuationMarks = false,
  length = { words: 250 },
  seed,
}: generateTextProps) {
  const wordCount =
    "words" in length
      ? length.words
      : Math.floor(length.seconds * wordsPerSecond);
  const seedRandom = prng_alea(seed);

  function probability_check(percent: number) {
    return seedRandom() < percent;
  }

  let generatedText = "";
  for (var counter: number = 0; counter < wordCount; counter++) {
    if (includeNumbers && probability_check(chanceOfNumber)) {
      generatedText += Math.floor(seedRandom() * maxNumber);
    } else {
      let newWord = wordList[Math.floor(seedRandom() * wordList.length)];
      if (includeCapitalLetters && probability_check(chanceOfCapital)) {
        newWord = newWord[0].toUpperCase() + newWord.slice(1);
      }
      generatedText += newWord;
    }
    if (includePunctuationMarks && probability_check(chanceOfPunctuation)) {
      generatedText +=
        punctuationMarks[Math.floor(seedRandom() * punctuationMarks.length)];
    }
    generatedText += " ";
  }
  return generatedText.split(" ").slice(0, -1);
}
