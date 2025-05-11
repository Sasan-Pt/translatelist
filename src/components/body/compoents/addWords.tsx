import {
  EditDataType,
  Language,
  TranslateWordsType,
} from "@/components/context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface AddWordsProps {
  setWordList: Dispatch<SetStateAction<TranslateWordsType>>;
  openAddOrEdit: boolean;
  setOpenAddOrEdit: Dispatch<SetStateAction<boolean>>;
  editData: EditDataType | null;
  setEditData: Dispatch<SetStateAction<EditDataType | null>>;
}

const primaryButtonClass =
  "bg-[#3762e5] text-white hover:bg-blue-500 hover:text-white";

export function AddWords({
  setWordList,
  setOpenAddOrEdit,
  openAddOrEdit,
  editData,
  setEditData,
}: AddWordsProps) {
  const [formData, setFormData] = useState({
    keyword: "",
    persian: "",
    japanese: "",
  });

  useEffect(() => {
    if (editData && editData.keyWord) {
      setFormData({
        keyword: editData?.keyWord,
        persian: editData?.[Language.FARSI],
        japanese: editData?.[Language.JAPANESE],
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (!editData) {
      if (!formData.keyword.trim()) {
        toast.error("Please enter a keyword");
        return;
      }

      if (!formData.persian.trim() && !formData.japanese.trim()) {
        toast.error(
          "Please enter at least one translation (Persian or Japanese)"
        );
        return;
      }

      setWordList((prev) => {
        const updated = {
          ...prev,
          [formData.keyword]: {
            [Language.FARSI]: formData.persian,
            [Language.JAPANESE]: formData.japanese,
            [Language.ALL]: formData.keyword,
          },
        };

        localStorage.setItem("wordList", JSON.stringify(updated));
        return updated;
      });

      toast.success("Translation added successfully!");
      setFormData({
        keyword: "",
        persian: "",
        japanese: "",
      });
    } else {
      setWordList((prev) => {
        const oldEntries = Object.entries(prev);
        const oldKeyWord = editData.keyWord;

        const newValue = {
          [Language.FARSI]: formData.persian,
          [Language.JAPANESE]: formData.japanese,
          [Language.ALL]: formData.keyword,
        };

        const updatedEntries = oldEntries.flatMap(([key, value]) =>
          key === oldKeyWord ? [[formData.keyword, newValue]] : [[key, value]]
        );

        const updatedObject = Object.fromEntries(updatedEntries);

        localStorage.setItem("wordList", JSON.stringify(updatedObject));

        return updatedObject;
      });
      toast.success("Translation edited successfully!");
      setFormData({
        keyword: "",
        persian: "",
        japanese: "",
      });
      setEditData(null);
    }

    setOpenAddOrEdit(false);
  };

  return (
    <Dialog open={openAddOrEdit} onOpenChange={setOpenAddOrEdit}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`mt-4 w-full mb-4 ${primaryButtonClass}`}
        >
          + Add keyWord
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Translation</DialogTitle>
          <DialogDescription>
            Add a new keyword with its translations. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keyword" className="text-right">
              keyWord
            </Label>
            <Input
              id="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="add a keyword"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="persian" className="text-right">
              Persian
            </Label>
            <Input
              id="persian"
              value={formData.persian}
              onChange={handleChange}
              placeholder="add persian translation"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="japanese" className="text-right">
              Japanese
            </Label>
            <Input
              id="japanese"
              value={formData.japanese}
              onChange={handleChange}
              placeholder="add japanese translation"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className={primaryButtonClass}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
