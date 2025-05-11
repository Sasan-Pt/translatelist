import { Language } from "@/components/context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TranslatedRowProps {
  hasTranslation: string;
  word: string;
  pickedLanguage: Language;
  translations: {
    [Language.FARSI]: string;
    [Language.JAPANESE]: string;
    [Language.ALL]: string;
  };
  index: number;
}

const TranslatedRow = ({
  hasTranslation,
  word,
  pickedLanguage,
  translations,
}: TranslatedRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: word });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      className="flex justify-between "
      {...attributes}
      {...listeners}
      key={word}
      style={style}
    >
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
};

export default TranslatedRow;
