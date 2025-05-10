import { createContext, Dispatch, SetStateAction } from "react";

export enum Language {
  FARSI = "fa",
  JAPANESE = "jp",
  ALL = "allSelected",
}

interface TranslationPair {
  [Language.FARSI]: string;
  [Language.JAPANESE]: string;
  [Language.ALL]: string;
}

export interface TranslateWordsType {
  [key: string]: TranslationPair;
}

interface DashboardContextType {
  wordList: TranslateWordsType;
  pickedLanguage: Language;
  setPickedLanguage: Dispatch<SetStateAction<Language>>;
  setWordList: Dispatch<SetStateAction<TranslateWordsType>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);
