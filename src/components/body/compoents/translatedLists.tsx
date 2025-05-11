import {
  EditDataType,
  Language,
  TranslateWordsType,
} from "@/components/context";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useMemo } from "react";
import TranslatedRow from "./translatedRow";
import { Button } from "@/components/ui/button";

interface TranslatedListsTypes {
  wordList: TranslateWordsType;
  pickedLanguage: Language;
  setWordList: Dispatch<SetStateAction<TranslateWordsType>>;
  setOpenAddOrEdit: Dispatch<SetStateAction<boolean>>;
  setEditData: Dispatch<SetStateAction<EditDataType | null>>;
}

const TranslatedLists = ({
  wordList,
  pickedLanguage,
  setWordList,
  setOpenAddOrEdit,
  setEditData,
}: TranslatedListsTypes) => {
  const items = useMemo(() => Object.keys(wordList), [wordList]);

  const handleDelete = (keyToDelete: string) => {
    setWordList((prev) => {
      const { [keyToDelete]: _, ...rest } = prev;
      return rest;
    });
  };

  const HandleEdit = (word: string) => {
    const newObject: EditDataType = {
      [Language.FARSI]: wordList[word][Language.FARSI],
      [Language.JAPANESE]: wordList[word][Language.JAPANESE],
      keyWord: word,
    };
    setEditData(newObject);
    setOpenAddOrEdit(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-4">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {Object.entries(wordList).map(([word, translations], index) => {
          const hasTranslation = translations[pickedLanguage];
          return (
            <div key={`word${index}`} className="border-b-1 py-2">
              <TranslatedRow
                index={index}
                hasTranslation={hasTranslation}
                word={word}
                pickedLanguage={pickedLanguage}
                translations={translations}
              />
              <Button
                onClick={() => handleDelete(word)}
                className="bg-red-600 hover:bg-red-500"
              >
                Delete
              </Button>
              <Button
                onClick={() => HandleEdit(word)}
                className="ml-2 bg-blue-500  hover:bg-blue-400"
              >
                Edit
              </Button>
            </div>
          );
        })}
      </SortableContext>
    </div>
  );
};

export default TranslatedLists;
