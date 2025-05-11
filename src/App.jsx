import Header from "./components/header/header";
import Body from "./components/body/body";
import { DashboardContext } from "./components/context";
import { useState } from "react";
import { Toaster } from "sonner";

function App() {
  const [translateList, setTranslateList] = useState({
    everything: { fa: "همه چیز", jp: "すべて" },
    is: { fa: "هست", jp: "がある" },
    result: { fa: "نتیجه", jp: "結果" },
    of: { fa: "از", jp: "の" },
    our: { fa: "ما", jp: "私たちの" },
    own: { fa: "خود", jp: "自身の" },
    choices: { fa: "", jp: "選択" },
  });
  const [pickedLanguage, setPickedLanguage] = useState("allSelected");
  const contextValue = {
    wordList: translateList,
    pickedLanguage,
    setPickedLanguage,
    setWordList: setTranslateList,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="grid grid-cols-[4%_92%_4%]  !bg-[#f6f7f9] font-[family-name:var(--font-geist-sans)]">
        <Toaster />
        <div className="col-start-2 h-full">
          <Header />
          <Body />
        </div>
      </div>
    </DashboardContext.Provider>
  );
}

export default App;
