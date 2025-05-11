import { useContext } from "react";
import { DashboardContext } from "../context";
import TranslatedLists from "./compoents/translatedLists";
import { AddWords } from "./compoents/addWords";

const Body = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    return null;
  }

  const { wordList, pickedLanguage, setWordList } = context;

  return (
    <>
      <TranslatedLists wordList={wordList} pickedLanguage={pickedLanguage} />
      <AddWords setWordList={setWordList} />
    </>
  );
};

export default Body;
