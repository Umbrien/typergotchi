export type generateTextProps = {
  includeNumbers?: boolean;
  includeCapitalLetters?: boolean;
  includePunctuationMarks?: boolean;
  length: { words: number } | { seconds: number };
  seed?: string;
};
