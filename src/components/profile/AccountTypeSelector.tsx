import { useState } from "react";

export type AccountType = "owner" | "buyer" | "agent" | "developer";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({ value, onChange }: AccountTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<AccountType>(value);

  const handleChange = (type: AccountType) => {
    setSelectedType(type);
    onChange(type);
  };

  return (
    <div className="flex space-x-4">
      {(["owner", "buyer", "agent", "developer"] as AccountType[]).map((type) => (
        <button
          key={type}
          className={`p-2 border rounded ${selectedType === type ? "bg-blue-500 text-white" : "bg-white text-black"}`}
          onClick={() => handleChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};
