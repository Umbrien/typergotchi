import { wordList } from './wordList.js';

const punctuationMarks = ['.', ',', ':', ';', '!', '?'];
const chanceOfNumber = 1/12;
const chanceOfCapital = 1/15;
const chanceOfPunctuation = 1/8;

function probability_check (percent: number){
  return Math.random() < percent;
}

type generateTextProps = {
  includeNumbers?: boolean,
  includeCapitalLetters?: boolean,
  includePunctuationMarks?: boolean,
  wordCount: number
}
export function generateText({
  includeNumbers = false,
  includeCapitalLetters = false,
  includePunctuationMarks = false,
  wordCount = 250
}: generateTextProps){
  let generatedText = '';
  for (var counter:number = 0; counter < wordCount; counter++){
    if(includeNumbers && probability_check(chanceOfNumber)){
      generatedText += Math.floor(Math.random() * 1000);
    }
    else{
      let newWord = wordList[Math.floor(Math.random() * wordList.length)];
      if (includeCapitalLetters && probability_check(chanceOfCapital)) {
          newWord = newWord[0].toUpperCase() + newWord.slice(1);
      }
      generatedText += newWord;
    }
    if(includePunctuationMarks && probability_check(chanceOfPunctuation)){
        generatedText += punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)]
    }
    generatedText += ' ';
  }
  return generatedText.split(' ');
}
