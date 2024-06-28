import { OptionType } from "@/types/data";
import React, { useState, useEffect, ChangeEvent } from "react";
import Button from "./Button";

type OptionItemProps = {
  option: OptionType;
  onUpdate: (opt: OptionType) => void;
  onRemove: () => void;
};

const OptionItem = ({ option, onUpdate, onRemove }: OptionItemProps) => {
  const [localOption, setLocalOption] = useState(option);

  useEffect(() => {
    onUpdate(localOption);
  }, [localOption]);

  const handleChange = (field: string, value: any) => {
    setLocalOption({ ...localOption, [field]: value });
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        value={localOption.strike_price || ""}
        onChange={(e) =>
          handleChange("strike_price", parseFloat(e.target.value))
        }
        type="number"
        placeholder="Strike Price"
        className="border border-gray-400 p-2 w-20"
      />
      <select
        value={localOption.type}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleChange("type", e.target.value)
        }
        className="border border-gray-400 p-2 w-20"
      >
        <option value="Call">Call</option>
        <option value="Put">Put</option>
      </select>
      <input
        value={localOption.bid || ""}
        onChange={(e) => handleChange("bid", parseFloat(e.target.value))}
        type="number"
        placeholder="Bid"
        className="border border-gray-400 p-2 w-20"
      />
      <input
        value={localOption.ask || ""}
        onChange={(e) => handleChange("ask", parseFloat(e.target.value))}
        type="number"
        placeholder="Ask"
        className="border border-gray-400 p-2 w-20"
      />
      <select
        value={localOption.long_short}
        onChange={(e) => handleChange("long_short", e.target.value)}
        className="border border-gray-400 p-2 w-20"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <Button onClick={onRemove} variant="secondary">
        Remove
      </Button>
    </div>
  );
};

export default OptionItem;
