import { useContext, useEffect } from "react";
import { DashboardContext, TranslateWordsType } from "../context";
import TranslatedLists from "./compoents/translatedLists";
import { AddWords } from "./compoents/addWords";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";

const Body = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    return null;
  }

  const {
    wordList,
    pickedLanguage,
    setWordList,
    openAddOrEdit,
    setOpenAddOrEdit,
    setEditData,
    editData,
  } = context;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const sourceKey = active.id;
    const destinationKey = over.id;
    const updatedTranslateList: TranslateWordsType = {};
    const keys = Object.keys(wordList);

    keys.forEach((key) => {
      if (key === sourceKey) {
        updatedTranslateList[destinationKey] = wordList[sourceKey];
      } else if (key === destinationKey) {
        updatedTranslateList[sourceKey] = wordList[destinationKey];
      } else {
        updatedTranslateList[key] = wordList[key];
      }
    });

    localStorage.setItem("wordList", JSON.stringify(updatedTranslateList));

    setWordList(updatedTranslateList);
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={(event) => handleDragEnd(event)}
      >
        <TranslatedLists
          wordList={wordList}
          pickedLanguage={pickedLanguage}
          setWordList={setWordList}
          setOpenAddOrEdit={setOpenAddOrEdit}
          setEditData={setEditData}
        />
      </DndContext>
      <AddWords
        editData={editData}
        setEditData={setEditData}
        setWordList={setWordList}
        openAddOrEdit={openAddOrEdit}
        setOpenAddOrEdit={setOpenAddOrEdit}
      />
    </>
  );
};

export default Body;
