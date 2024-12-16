import { X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface LiveChatProps {
  messages: Message[];
  onClose: () => void;
}

export const LiveChat = ({ messages, onClose }: LiveChatProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-white font-semibold">Chat en direct</h3>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="font-semibold text-white">{message.sender}</div>
            <div className="text-gray-300">{message.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};