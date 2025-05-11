import { Language, TranslateWordsType } from "@/components/context";

interface TranslatedListsTypes {
  wordList: TranslateWordsType;
  pickedLanguage: Language;
}
const TranslatedLists = ({
  wordList,
  pickedLanguage,
}: TranslatedListsTypes) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-4">
      {Object.entries(wordList).map(([word, translations]) => {
        const hasTranslation = translations[pickedLanguage];
        return (
          <div className="flex justify-between border-b-1 py-2" key={word}>
            <div
              className={
                !hasTranslation && pickedLanguage !== Language.ALL
                  ? "text-red-500"
                  : ""
              }
            >
              {word}
            </div>
            {pickedLanguage !== Language.ALL ? (
              <div
                className={`${
                  !translations[pickedLanguage]
                    ? "text-white bg-red-400"
                    : "bg-[#f9f9f9]"
                }  px-6 py-1 rounded-sm flex justify-center items-center`}
              >
                {translations[pickedLanguage] || "...."}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div
                  className={`${
                    !translations[Language.FARSI] && "hidden"
                  } bg-[#f9f9f9] px-6 py-1 rounded-sm flex justify-center items-center`}
                >
                  {translations[Language.FARSI]}
                </div>
                <div
                  className={`${
                    !translations[Language.JAPANESE] && "hidden"
                  } bg-[#f9f9f9] px-6 py-1 rounded-sm flex justify-center items-center`}
                >
                  {translations[Language.JAPANESE]}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TranslatedLists;
