import { Language, TranslateWordsType } from "@/components/context";
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
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface AddWordsProps {
  setWordList: Dispatch<SetStateAction<TranslateWordsType>>;
}

export function AddWords({ setWordList }: AddWordsProps) {
  const [formData, setFormData] = useState({
    keyword: "",
    persian: "",
    japanese: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
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

    setWordList((prev) => ({
      ...prev,
      [formData.keyword]: {
        [Language.FARSI]: formData.persian,
        [Language.JAPANESE]: formData.japanese,
        [Language.ALL]: formData.keyword,
      },
    }));

    toast.success("Translation added successfully!");
    setFormData({
      keyword: "",
      persian: "",
      japanese: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 w-full bg-[#3762e5] text-white hover:bg-blue-500 hover:text-white"
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
          <Button
            onClick={handleSubmit}
            className="bg-[#3762e5] text-white hover:bg-blue-500 hover:text-white"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
