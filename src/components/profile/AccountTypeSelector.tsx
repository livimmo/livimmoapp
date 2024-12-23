import { AccountType } from "@/types/user";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({ value, onChange }: AccountTypeSelectorProps) => {
  const accountTypes: AccountType[] = ["user", "agent", "promoter", "developer", "owner", "buyer", "tenant", "admin"];

  return (
    <div className="flex gap-4">
      {accountTypes.map((type) => (
        <button
          key={type}
          className={`py-2 px-4 rounded ${value === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => onChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};