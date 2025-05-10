"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DashboardContext, Language } from "../context";

const frameworks = [
  {
    value: Language.ALL,
    label: "allSelected",
  },
  {
    value: Language.JAPANESE,
    label: "Japan",
  },
  {
    value: Language.FARSI,
    label: "Persian",
  },
];

export function Picker() {
  const initialData = React.useContext(DashboardContext);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialData?.pickedLanguage);
  const setPickedLanguage = initialData?.setPickedLanguage;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="max-w-[200px] min-w-[100px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select a Language"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value
                        ? ("allSelected" as Language)
                        : (currentValue as Language)
                    );
                    setPickedLanguage &&
                      setPickedLanguage(
                        currentValue === value
                          ? ("allSelected" as Language)
                          : (currentValue as Language)
                      );
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
