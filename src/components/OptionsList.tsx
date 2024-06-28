import React from "react";
import { OptionType } from "@/types/data";
import OptionItem from "./OptionItem";
import Button from "./Button";

type OptionsListProps = {
  options: OptionType[];
  onAddOption: () => void;
  onUpdateOption: (index: number, opt: OptionType) => void;
  onRemoveOption: (index: number) => void;
};

const OptionsList = ({
  options,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: OptionsListProps) => {
  return (
    <div>
      {options.map((option, index) => (
        <OptionItem
          key={index}
          option={option}
          onUpdate={(updatedOption: OptionType) =>
            onUpdateOption(index, updatedOption)
          }
          onRemove={() => onRemoveOption(index)}
        />
      ))}
      {options.length < 4 && (
        <Button variant="primary" onClick={onAddOption}>
          Add
        </Button>
      )}
    </div>
  );
};

export default OptionsList;
